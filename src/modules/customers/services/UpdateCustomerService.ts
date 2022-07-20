import { ICustomersRepository } from '@modules/customers/domain/repositories/ICustomersRepository';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import Customers from '../infra/typeorm/entities/Customers';

interface IRequest {
  id: string;
  name: string;
  email: string;
}
@injectable()
export default class UpdateCustomerService {
  constructor(
    @inject('CustomerRepository')
    private customerRepository: ICustomersRepository,
  ) {}
  public async execute({ id, name, email }: IRequest): Promise<Customers> {
    const customer = await this.customerRepository.findById(id);

    if (!customer) {
      throw new AppError('Customer not found');
    }

    const emailExists = await this.customerRepository.findByEmail(email);

    if (emailExists && emailExists.id !== id) {
      throw new AppError('Email address already used');
    }

    customer.name = name;
    customer.email = email;

    return await this.customerRepository.save(customer);
  }
}

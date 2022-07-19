import { ICustomer } from './../domain/models/ICustomer';
import { ICustomersRepository } from './../domain/repositories/ICustomersRepository';
import { ICreateCustomer } from './../domain/models/ICreateCustomer';
import AppError from '@shared/errors/AppError';

export default class CreateCustomerService {
  constructor(private customerRepository: ICustomersRepository) {}
  public async execute({ name, email }: ICreateCustomer): Promise<ICustomer> {
    const emailExists = await this.customerRepository.findByEmail(email);

    if (emailExists) {
      throw new AppError('Email address already used');
    }
    return await this.customerRepository.create({ name, email });
  }
}

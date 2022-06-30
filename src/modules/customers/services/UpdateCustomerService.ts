import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import Customers from '../typeorm/entities/Customers';
import { CustomerRepository } from '../typeorm/repositories/CustomersRepositoy';

interface IRequest {
  id: string;
  name: string;
  email: string;
}

export default class UpdateCustomerService {
  public static async execute({
    id,
    name,
    email,
  }: IRequest): Promise<Customers> {
    const customerRepository = getCustomRepository(CustomerRepository);

    const customer = await customerRepository.findById(id);

    if (!customer) {
      throw new AppError('Customer not found');
    }

    const emailExists = await customerRepository.findByEmail(email);

    if (emailExists && emailExists.id !== id) {
      throw new AppError('Email address already used');
    }

    customer.name = name;
    customer.email = email;

    return await customerRepository.save(customer);
  }
}

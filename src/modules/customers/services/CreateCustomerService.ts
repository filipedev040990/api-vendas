import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import Customers from '../infra/typeorm/entities/Customers';
import { CustomerRepository } from '../infra/typeorm/repositories/CustomersRepositoy';

interface IRequest {
  name: string;
  email: string;
}

export default class CreateCustomerService {
  public static async execute({ name, email }: IRequest): Promise<Customers> {
    const customerRepository = getCustomRepository(CustomerRepository);
    const emailExists = await customerRepository.findByEmail(email);

    if (emailExists) {
      throw new AppError('Email address already used');
    }

    const user = customerRepository.create({ name, email });
    return await customerRepository.save(user);
  }
}

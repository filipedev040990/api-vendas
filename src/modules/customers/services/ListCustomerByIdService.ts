import { getCustomRepository } from 'typeorm';
import Customers from '../infra/typeorm/entities/Customers';
import { CustomerRepository } from '../infra/typeorm/repositories/CustomersRepository';

export default class ListCustomerById {
  public static async execute(id: string): Promise<Customers | undefined> {
    const customerRepository = getCustomRepository(CustomerRepository);
    return await customerRepository.findById(id);
  }
}

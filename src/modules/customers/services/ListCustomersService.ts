import { getCustomRepository } from 'typeorm';
import Customers from '../typeorm/entities/Customers';
import { CustomerRepository } from '../typeorm/repositories/CustomersRepositoy';

export default class ListCustomersService {
  public static async execute(): Promise<Customers[]> {
    const customerRepository = getCustomRepository(CustomerRepository);
    return await customerRepository.find();
  }
}

import { getCustomRepository } from 'typeorm';
import Customers from '../infra/typeorm/entities/Customers';
import { CustomerRepository } from '../infra/typeorm/repositories/CustomersRepositoy';

export default class ListCustomerById {
  public static async execute(id: string): Promise<Customers | undefined> {
    const customerRepository = getCustomRepository(CustomerRepository);
    return await customerRepository.findById(id);
  }
}

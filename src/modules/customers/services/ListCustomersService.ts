import { getCustomRepository } from 'typeorm';
import Customers from '../typeorm/entities/Customers';
import { CustomerRepository } from '../typeorm/repositories/CustomersRepositoy';

interface IPaginateCustomer {
  from: number;
  to: number;
  per_page: number;
  total: number;
  current_page: number;
  data: Customers[];
}

export default class ListCustomersService {
  public static async execute(): Promise<IPaginateCustomer> {
    const customerRepository = getCustomRepository(CustomerRepository);
    return await customerRepository.createQueryBuilder().paginate();
  }
}

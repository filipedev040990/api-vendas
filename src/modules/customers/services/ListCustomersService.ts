import { getCustomRepository } from 'typeorm';
import Customers from '../infra/typeorm/entities/Customers';
import { CustomerRepository } from '../infra/typeorm/repositories/CustomersRepository';

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

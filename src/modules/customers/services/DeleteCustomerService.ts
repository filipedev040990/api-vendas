import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import { CustomerRepository } from '../infra/typeorm/repositories/CustomersRepositoy';

export default class DeleteCustomerService {
  public static async execute(id: string): Promise<void> {
    const customerRepository = getCustomRepository(CustomerRepository);
    const customer = await customerRepository.findById(id);

    if (!customer) {
      throw new AppError('Customer not found');
    }

    await customerRepository.remove(customer);
  }
}

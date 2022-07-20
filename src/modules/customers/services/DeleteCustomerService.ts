import { ICustomersRepository } from '@modules/customers/domain/repositories/ICustomersRepository';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';

@injectable()
export default class DeleteCustomerService {
  constructor(
    @inject('CustomerRepository')
    private customerRepository: ICustomersRepository,
  ) {}
  public async execute(id: string): Promise<void> {
    const customer = await this.customerRepository.findById(id);

    if (!customer) {
      throw new AppError('Customer not found');
    }

    await this.customerRepository.remove(customer);
  }
}

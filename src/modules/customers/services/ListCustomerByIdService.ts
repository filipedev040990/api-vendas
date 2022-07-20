import { ICustomersRepository } from '@modules/customers/domain/repositories/ICustomersRepository';
import { inject, injectable } from 'tsyringe';
import Customers from '../infra/typeorm/entities/Customers';

@injectable()
export default class ListCustomerById {
  constructor(
    @inject('CustomerRepository')
    private customerRepository: ICustomersRepository,
  ) {}
  public async execute(id: string): Promise<Customers | undefined> {
    return await this.customerRepository.findById(id);
  }
}

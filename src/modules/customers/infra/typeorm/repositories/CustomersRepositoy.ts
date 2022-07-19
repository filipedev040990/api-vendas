import { ICustomersRepository } from './../../../domain/repositories/ICustomersRepository';
import { EntityRepository, Repository } from 'typeorm';
import Customers from '../entities/Customers';
import { ICustomer } from '@modules/customers/domain/models/ICustomer';

@EntityRepository(Customers)
export class CustomerRepository
  extends Repository<Customers>
  implements ICustomersRepository
{
  public async findByEmail(email: string): Promise<ICustomer | undefined> {
    return this.findOne({ where: { email } });
  }

  public async findById(id: string): Promise<ICustomer | undefined> {
    return this.findOne({ where: { id } });
  }

  public async findByName(name: string): Promise<ICustomer | undefined> {
    return this.findOne({ where: { name } });
  }
}

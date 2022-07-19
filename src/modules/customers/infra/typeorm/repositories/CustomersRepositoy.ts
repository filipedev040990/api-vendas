import { EntityRepository, Repository } from 'typeorm';
import Customers from '../entities/Customers';

@EntityRepository(Customers)
export class CustomerRepository extends Repository<Customers> {
  public async findByEmail(email: string): Promise<Customers | undefined> {
    return this.findOne({ where: { email } });
  }

  public async findById(id: string): Promise<Customers | undefined> {
    return this.findOne({ where: { id } });
  }

  public async findByName(name: string): Promise<Customers[] | undefined> {
    return this.find({ where: { name } });
  }
}

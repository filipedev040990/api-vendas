import { ICreateCustomer } from './../../../domain/models/ICreateCustomer';
import { ICustomersRepository } from '../../../domain/repositories/ICustomersRepository';
import { Repository } from 'typeorm';
import Customers from '../entities/Customers';

export class CustomerRepository implements ICustomersRepository {
  constructor(private ormRepository: Repository<Customers>) {}

  public async create({ name, email }: ICreateCustomer): Promise<Customers> {
    return this.ormRepository.create({ name, email });
  }

  public async save(customer: Customers): Promise<Customers> {
    return this.ormRepository.save(customer);
  }

  public async findByEmail(email: string): Promise<Customers | undefined> {
    return this.ormRepository.findOne({ where: { email } });
  }

  public async findById(id: string): Promise<Customers | undefined> {
    return this.ormRepository.findOne({ where: { id } });
  }

  public async findByName(name: string): Promise<Customers | undefined> {
    return this.ormRepository.findOne({ where: { name } });
  }
}

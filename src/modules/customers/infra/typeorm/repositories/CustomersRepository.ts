import { ICreateCustomer } from './../../../domain/models/ICreateCustomer';
import { ICustomersRepository } from '../../../domain/repositories/ICustomersRepository';
import { Repository, getRepository } from 'typeorm';
import Customers from '../entities/Customers';

export class CustomerRepository implements ICustomersRepository {
  private ormRepository: Repository<Customers>;
  constructor() {
    this.ormRepository = getRepository(Customers);
  }

  public async create({ name, email }: ICreateCustomer): Promise<Customers> {
    const customer = this.ormRepository.create({ name, email });
    return this.ormRepository.save(customer);
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

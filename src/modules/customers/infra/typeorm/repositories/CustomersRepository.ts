import AppError from '@shared/errors/AppError';
import { ICreateCustomer } from './../../../domain/models/ICreateCustomer';
import { ICustomersRepository } from '../../../domain/repositories/ICustomersRepository';
import { Repository, getRepository } from 'typeorm';
import Customers from '../entities/Customers';
import { ICustomerPaginate } from '@modules/customers/domain/models/ICustomerPaginate';
import { SearchParams } from '../../../domain/repositories/ICustomersRepository';

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

  public async findAll({
    page,
    skip,
    take,
  }: SearchParams): Promise<ICustomerPaginate> {
    const [customers, count] = await this.ormRepository
      .createQueryBuilder()
      .skip(skip)
      .take(take)
      .getManyAndCount();

    return {
      per_page: take,
      total: count,
      current_page: page,
      data: customers,
    };
  }

  public async findByName(name: string): Promise<Customers | undefined> {
    return this.ormRepository.findOne({ where: { name } });
  }

  public async remove(customer: Customers): Promise<void> {
    await this.ormRepository.remove(customer);
  }
}

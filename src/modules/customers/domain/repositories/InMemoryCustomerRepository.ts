import { ICreateCustomer } from '@modules/customers/domain/models/ICreateCustomer';
import {
  ICustomersRepository,
  SearchParams,
} from '@modules/customers/domain/repositories/ICustomersRepository';
import { uuid } from 'uuidv4';
import Customers from '../../infra/typeorm/entities/Customers';
import { ICustomerPaginate } from '../models/ICustomerPaginate';

export class InMemoryCustomerRepository implements ICustomersRepository {
  private customers: Customers[] = [
    {
      id: '123456',
      name: 'Teste',
      email: 'teste@gmail.com',
      created_at: new Date(),
      updated_at: new Date(),
    },
  ];

  public async create({ name, email }: ICreateCustomer): Promise<Customers> {
    const customer = new Customers();

    customer.id = uuid();
    customer.name = name;
    customer.email = email;

    this.customers.push(customer);

    return customer;
  }

  public async save(customer: Customers): Promise<Customers> {
    const findIndex = this.customers.findIndex(
      findCustomer => findCustomer.id === customer.id,
    );
    this.customers[findIndex] = customer;
    return customer;
  }

  public async findByEmail(email: string): Promise<Customers | undefined> {
    return this.customers.find(customer => customer.email === email);
  }

  public async findById(id: string): Promise<Customers | undefined> {
    return this.customers.find(customer => customer.id === id);
  }

  public async findAll({
    page,
    skip,
    take,
  }: SearchParams): Promise<ICustomerPaginate | undefined> {
    return undefined;
  }

  public async findByName(name: string): Promise<Customers | undefined> {
    return this.customers.find(customer => customer.name === name);
  }

  public async remove(customer: Customers): Promise<void> {
    this.customers = this.customers.filter(c => c.id !== customer.id);
  }
}

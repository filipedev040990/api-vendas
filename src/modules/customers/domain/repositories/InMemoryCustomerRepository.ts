import { ICreateCustomer } from '@modules/customers/domain/models/ICreateCustomer';
import { ICustomersRepository } from '@modules/customers/domain/repositories/ICustomersRepository';
import { uuid } from 'uuidv4';
import Customers from '../../infra/typeorm/entities/Customers';

export class InMemoryCustomerRepository
  implements Omit<ICustomersRepository, 'findAll' | 'remove'>
{
  private customers: Customers[] = [];

  public async create({ name, email }: ICreateCustomer): Promise<Customers> {
    const customer = new Customers();

    customer.id = uuid();
    customer.name = name;
    customer.email = email;

    this.customers.push(customer);

    return customer;
  }

  public async save(customer: Customers): Promise<Customers> {
    Object.assign(this.customers, customer);
    return customer;
  }

  public async findByEmail(email: string): Promise<Customers | undefined> {
    return this.customers.find(customer => customer.email === email);
  }

  public async findById(id: string): Promise<Customers | undefined> {
    return this.customers.find(customer => customer.id === id);
  }

  public async findByName(name: string): Promise<Customers | undefined> {
    return this.customers.find(customer => customer.name === name);
  }
}

import { ICustomer } from '../models/ICustomer';

export interface ICustomersRepository {
  findByEmail(email: string): Promise<ICustomer | undefined>;
  findById(id: string): Promise<ICustomer | undefined>;
  findByName(name: string): Promise<ICustomer | undefined>;
  // create(data: ICustomer): Promise<ICustomer>;
  // save(customer: ICustomer): Promise<ICustomer>;
}

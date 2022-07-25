import { ICustomerPaginate } from './../models/ICustomerPaginate';
import { ICreateCustomer } from './../models/ICreateCustomer';
import { ICustomer } from '../models/ICustomer';

export interface SearchParams {
  page: number;
  skip: number;
  take: number;
}

export interface ICustomersRepository {
  findByEmail(email: string): Promise<ICustomer | undefined>;
  findById(id: string): Promise<ICustomer | undefined>;
  findByName(name: string): Promise<ICustomer | undefined>;
  findAll({
    page,
    skip,
    take,
  }: SearchParams): Promise<ICustomerPaginate | undefined>;
  create(data: ICreateCustomer): Promise<ICustomer>;
  save(customer: ICustomer): Promise<ICustomer>;
  remove(customer: ICustomer): Promise<void>;
}

import Customers from '@modules/customers/infra/typeorm/entities/Customers';
import { IProduct } from './IProduct';

export interface ICreateOrder {
  customer: Customers;
  products: IProduct[];
}

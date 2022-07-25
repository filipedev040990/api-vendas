import Customers from '@modules/customers/infra/typeorm/entities/Customers';
import { IProduct } from './IProduct-old';

export interface ICreateOrder {
  customer: Customers;
  products: IProduct[];
}

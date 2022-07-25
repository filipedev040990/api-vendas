import Customers from '@modules/customers/infra/typeorm/entities/Customers';
import { ICreateOrderProducts } from './ICreateOrderProducts';

export interface ICreateOrder {
  customer: Customers;
  products: ICreateOrderProducts[];
}

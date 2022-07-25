import { ICustomer } from './../../../customers/domain/models/ICustomer';
import { ICreateOrderProducts } from './ICreateOrderProducts';
export interface IOrders {
  id: string;
  created_at: Date;
  updated_at: Date;
  customer_id: ICustomer;
  order_products: ICreateOrderProducts[];
}

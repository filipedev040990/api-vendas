import { ICustomer } from './../../../customers/domain/models/ICustomer';
export interface IOrders {
  id: string;
  created_at: Date;
  updated_at: Date;
  customer_id: ICustomer;
}

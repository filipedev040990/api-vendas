import { ICreateOrder } from './../models/ICreateOrder';
import { IOrders } from './../models/IOrders';
export interface IOrderRepository {
  findById(id: string): Promise<IOrders | undefined>;
  createOrder({ customer, products }: ICreateOrder): Promise<IOrders>;
  save(order: IOrders): Promise<IOrders>;
  findAll(): Promise<IOrders[]>;
}

import Customers from '@modules/customers/typeorm/entities/Customers';
import { EntityRepository, Repository } from 'typeorm';
import Orders from '../entities/Orders';

interface IProduct {
  product_id: string;
  quantity: number;
  price: number;
}

interface IRequest {
  customer: Customers;
  products: IProduct[];
}

@EntityRepository(Orders)
export default class OrderProductsRepository extends Repository<Orders> {
  public async findById(id: string): Promise<Orders | undefined> {
    return this.findOne(id, {
      relations: ['customer_id', 'order_products'],
    });
  }

  public async createOrder({ customer, products }: IRequest): Promise<Orders> {
    const order = this.create({
      customer_id: customer,
      order_products: products,
    });

    return await this.save(order);
  }
}

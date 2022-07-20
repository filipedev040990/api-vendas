import { IOrderRepository } from './../../../domain/repositories/IOrderRepository';
import { ICreateOrder } from './../../../domain/models/ICreateOrder';
import { getRepository, Repository } from 'typeorm';
import Orders from '../entities/Orders';

export class OrdersRepository implements IOrderRepository {
  private ormRepository: Repository<Orders>;
  constructor() {
    this.ormRepository = getRepository(Orders);
  }
  public async findById(id: string): Promise<Orders | undefined> {
    return this.ormRepository.findOne(id, {
      relations: ['customer_id', 'order_products'],
    });
  }

  public async createOrder({
    customer,
    products,
  }: ICreateOrder): Promise<Orders> {
    const order = this.ormRepository.create({
      customer_id: customer,
      order_products: products,
    });

    return await this.ormRepository.save(order);
  }

  public async save(order: Orders): Promise<Orders> {
    return this.ormRepository.save(order);
  }
}

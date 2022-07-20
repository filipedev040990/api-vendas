import { IOrderRepository } from './../domain/repositories/IOrderRepository';
import Orders from '../infra/typeorm/entities/Orders';
import RedisCache from '@shared/cache/RedisCache';
import { inject, injectable } from 'tsyringe';

@injectable()
export default class ListOrderService {
  constructor(
    @inject('OrdersRepository')
    private orderRepository: IOrderRepository,
  ) {}
  public async execute(): Promise<Orders> {
    const redisCache = new RedisCache();

    let orders = await redisCache.recover<any>('api-vendas-ORDER_LIST');

    if (!orders) {
      orders = await this.orderRepository.findAll();
      await redisCache.save('api-vendas-ORDER_LIST', orders);
    }
    return orders;
  }
}

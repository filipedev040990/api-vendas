import { getCustomRepository } from 'typeorm';
import Orders from '../typeorm/entities/Orders';
import OrdersRepository from '../typeorm/repositories/OrdersRepository';
import RedisCache from '@shared/cache/RedisCache';

export default class ListOrderService {
  public static async execute(): Promise<Orders[]> {
    const orderRepository = getCustomRepository(OrdersRepository);

    const redisCache = new RedisCache();

    let orders = await redisCache.recover<Orders[]>('api-vendas-ORDER_LIST');

    if (!orders) {
      orders = await orderRepository.find();
      await redisCache.save('api-vendas-ORDER_LIST', orders);
    }
    return orders;
  }
}

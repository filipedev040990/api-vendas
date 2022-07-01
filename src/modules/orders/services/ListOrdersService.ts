import { getCustomRepository } from 'typeorm';
import Orders from '../typeorm/entities/Orders';
import OrdersRepository from '../typeorm/repositories/OrdersRepository';

export default class ListOrderService {
  public static async execute(): Promise<Orders[]> {
    const orderRepository = getCustomRepository(OrdersRepository);
    return await orderRepository.find();
  }
}

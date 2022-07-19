import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import Orders from '../infra/typeorm/entities/Orders';
import OrdersRepository from '../infra/typeorm/repositories/OrdersRepository';

export default class ListOrderByIdService {
  public static async execute(id: string): Promise<Orders | undefined> {
    const orderRepository = getCustomRepository(OrdersRepository);
    const order = await orderRepository.findById(id);

    if (!order) {
      throw new AppError('Order not found');
    }
    return order;
  }
}

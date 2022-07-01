import { getCustomRepository } from 'typeorm';
import Orders from '../typeorm/entities/Orders';
import OrdersRepository from '../typeorm/repositories/OrdersRepository';

interface IPaginateOrders {
  from: number;
  to: number;
  per_page: number;
  total: number;
  current_page: number;
  data: Orders[];
}

export default class ListOrderService {
  public static async execute(): Promise<IPaginateOrders> {
    const orderRepository = getCustomRepository(OrdersRepository);
    return await orderRepository.createQueryBuilder().paginate();
  }
}

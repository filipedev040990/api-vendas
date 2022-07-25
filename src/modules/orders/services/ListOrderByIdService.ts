import { IOrders } from '@modules/orders/domain/models/IOrders';
import { IOrderRepository } from './../domain/repositories/IOrderRepository';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';

@injectable()
export default class ListOrderByIdService {
  constructor(
    @inject('OrdersRepository')
    private orderRepository: IOrderRepository,
  ) {}
  public async execute(id: string): Promise<IOrders | undefined> {
    const order = await this.orderRepository.findById(id);

    if (!order) {
      throw new AppError('Order not found');
    }
    return order;
  }
}

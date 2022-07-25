import { IOrders } from '@modules/orders/domain/models/IOrders';
import { IOrderRepository } from './../domain/repositories/IOrderRepository';
import { ICustomersRepository } from './../../customers/domain/repositories/ICustomersRepository';
import AppError from '@shared/errors/AppError';
import RedisCache from '@shared/cache/RedisCache';
import { inject, injectable } from 'tsyringe';
import { IProductRepository } from '@modules/products/domain/repositories/IProductRepository';

interface IProduct {
  id: string;
  quantity: number;
}

export type CreateOrderRequest = {
  customer_id: string;
  products: IProduct[];
};

@injectable()
export default class CreateOrderService {
  constructor(
    @inject('CustomerRepository')
    private customerRepository: ICustomersRepository,

    @inject('OrdersRepository')
    private orderRepository: IOrderRepository,

    @inject('ProductRepository')
    private productRepository: IProductRepository,
  ) {}
  public async execute({
    customer_id,
    products,
  }: CreateOrderRequest): Promise<IOrders> {
    const customerExists = await this.customerRepository.findById(customer_id);

    if (!customerExists) {
      throw new AppError('Could not find any customer with the given id.');
    }

    const productExists = await this.productRepository.findAllByIds(products);

    if (!productExists.length) {
      throw new AppError('Could not find any product with the given id.');
    }

    const existsProductsIds = productExists.map(product => product.id);

    const checkInexistentProduct = products.filter(
      product => !existsProductsIds.includes(product.id),
    );

    if (checkInexistentProduct.length) {
      throw new AppError(
        `Could not find product ${checkInexistentProduct[0].id}`,
      );
    }

    const quantityAvailable = products.filter(
      product =>
        productExists.filter(p => p.id === product.id)[0].quantity <
        product.quantity,
    );

    if (quantityAvailable.length) {
      throw new AppError(
        `The quantity ${quantityAvailable[0].quantity} is not available for ${quantityAvailable[0].id}`,
      );
    }

    const serializedProducts = products.map(product => ({
      product_id: product.id,
      quantity: product.quantity,
      price: productExists.filter(p => p.id === product.id)[0].price,
    }));

    const order = await this.orderRepository.createOrder({
      customer: customerExists,
      products: serializedProducts,
    });

    const { order_products } = order;

    const updatedProductQuantity = order_products.map(product => ({
      id: product.product_id,
      quantity:
        productExists.filter(p => p.id === product.product_id)[0].quantity -
        product.quantity,
    }));

    const redisCache = new RedisCache();

    await redisCache.invalidate('api-vendas-ORDER_LIST');

    await this.productRepository.updateStock(updatedProductQuantity);

    return order;
  }
}

import { IProductRepository } from './../domain/repositories/IProductRepository';
import AppError from '@shared/errors/AppError';
import Product from '../infra/typeorm/entities/Products';
import RedisCache from '@shared/cache/RedisCache';
import { inject, injectable } from 'tsyringe';

export type IProductRequest = {
  name: string;
  price: number;
  quantity: number;
};

@injectable()
export default class CreateProductService {
  constructor(
    @inject('ProductRepository')
    private productRepository: IProductRepository,
  ) { }
  public async execute({
    name,
    price,
    quantity,
  }: IProductRequest): Promise<Product> {
    const productExists = await this.productRepository.findByName(name);

    if (productExists) {
      throw new AppError('There is already product with this name');
    }

    if (price < 0) {
      throw new AppError('Price is invalid');
    }

    if (quantity < 0) {
      throw new AppError('Quantity is invalid');
    }

    const redisCache = new RedisCache();

    await redisCache.invalidate('api-vendas-PRODUCT_LIST');

    return await this.productRepository.create({ name, price, quantity });
  }
}

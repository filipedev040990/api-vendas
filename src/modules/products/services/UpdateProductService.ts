import { IProductRepository } from './../domain/repositories/IProductRepository';
import RedisCache from '@shared/cache/RedisCache';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import Product from '../infra/typeorm/entities/Products';

export type IUpdateProductRequest = {
  id: string;
  name: string;
  price: number;
  quantity: number;
};

@injectable()
export default class UpdateProductService {
  constructor(
    @inject('ProductRepository')
    private productRepository: IProductRepository,
  ) {}
  public async execute({
    id,
    name,
    price,
    quantity,
  }: IUpdateProductRequest): Promise<Product> {
    const product = await this.productRepository.findbyId(id);

    if (!product) {
      throw new AppError('Product not found');
    }

    const productExists = await this.productRepository.findByName(name);

    if (productExists && productExists.id !== product.id) {
      throw new AppError('There is already product whith this name');
    }

    product.name = name;
    product.price = price;
    product.quantity = quantity;

    const redisCache = new RedisCache();

    await redisCache.invalidate('api-vendas-PRODUCT_LIST');

    await this.productRepository.save(product);
    return product;
  }
}

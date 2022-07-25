import { IProductRepository } from './../domain/repositories/IProductRepository';
import Product from '../infra/typeorm/entities/Products';
import RedisCache from '@shared/cache/RedisCache';
import { inject, injectable } from 'tsyringe';

@injectable()
export default class ListProductsService {
  constructor(
    @inject('ProductRepository')
    private productRepository: IProductRepository,
  ) {}
  public async execute(): Promise<Product[]> {
    const redisCache = new RedisCache();

    let products = await redisCache.recover<Product[]>(
      'api-vendas-PRODUCT_LIST',
    );

    if (!products) {
      products = await this.productRepository.find();
      await redisCache.save('api-vendas-PRODUCT_LIST', products);
    }
    return products;
  }
}

import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import Product from '../infra/typeorm/entities/Products';
import { ProductRepository } from '../infra/typeorm/repositories/ProductsRepository';

export default class ShowProductService {
  public static async execute(id: string): Promise<Product | undefined> {
    const productRepository = getCustomRepository(ProductRepository);
    const product = await productRepository.findOne(id);

    if (!product) {
      throw new AppError('Product not found');
    }
    return product;
  }
}

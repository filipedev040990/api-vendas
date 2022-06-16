import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import { ProductRepository } from '../typeorm/repositories/ProductsRepository';

export class DeleteProductService {
  public static async execute(id: string) {
    const productRepository = getCustomRepository(ProductRepository);
    const product = await productRepository.findOne(id);

    if (!product) {
      throw new AppError('Product not found');
    }
    await productRepository.remove(product);
  }
}

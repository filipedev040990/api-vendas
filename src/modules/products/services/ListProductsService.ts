import { getCustomRepository } from 'typeorm';
import { ProductRepository } from '../typeorm/repositories/ProductsRepository';
import Product from '../typeorm/entities/Products';

export default class ListProductsService {
  public static async execute(): Promise<Product[]> {
    const productRepository = getCustomRepository(ProductRepository);
    return await productRepository.find();
  }
}

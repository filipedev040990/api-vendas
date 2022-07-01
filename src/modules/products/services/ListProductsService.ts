import { getCustomRepository } from 'typeorm';
import { ProductRepository } from '../typeorm/repositories/ProductsRepository';
import Product from '../typeorm/entities/Products';

interface IPaginateProduct {
  from: number;
  to: number;
  per_page: number;
  total: number;
  current_page: number;
  data: Product[];
}

export default class ListProductsService {
  public static async execute(): Promise<IPaginateProduct> {
    const productRepository = getCustomRepository(ProductRepository);
    return await productRepository.createQueryBuilder().paginate();
  }
}

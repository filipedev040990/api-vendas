import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import { ProductRepository } from '../typeorm/repositories/ProductsRepository';
import Product from '../typeorm/entities/Products';

interface IRequest {
  name: string;
  price: number;
  quantity: number;
}
export class CreateProductService {
  public static async execute({
    name,
    price,
    quantity,
  }: IRequest): Promise<Product> {
    const productRepository = getCustomRepository(ProductRepository);
    const productExists = await productRepository.findByName(name);

    if (productExists) {
      throw new AppError('There is already product with this name');
    }

    const product = productRepository.create({ name, price, quantity });
    return await productRepository.save(product);
  }
}

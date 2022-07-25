import { IProductRepository } from './../domain/repositories/IProductRepository';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import Product from '../infra/typeorm/entities/Products';

@injectable()
export default class ShowProductService {
  constructor(
    @inject('ProductRepository')
    private productRepository: IProductRepository,
  ) {}
  public async execute(id: string): Promise<Product | undefined> {
    const product = await this.productRepository.findbyId(id);

    if (!product) {
      throw new AppError('Product not found');
    }
    return product;
  }
}

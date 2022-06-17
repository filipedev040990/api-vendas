import { EntityRepository, Repository } from 'typeorm';
import Products from '../entities/Products';

@EntityRepository(Products)
export class ProductRepository extends Repository<Products> {
  public async findByName(name: string): Promise<Products | undefined> {
    return this.findOne({ where: { name } });
  }
}

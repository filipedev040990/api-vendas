import { EntityRepository, In, Repository } from 'typeorm';
import Products from '../entities/Products';

interface IFindProducts {
  id: string;
}

@EntityRepository(Products)
export class ProductRepository extends Repository<Products> {
  public async findByName(name: string): Promise<Products | undefined> {
    return this.findOne({ where: { name } });
  }

  public async findAllByIds(products: IFindProducts[]): Promise<Products[]> {
    const productId = products.map(product => product.id);
    return await this.find({ where: { id: In(productId) } });
  }
}

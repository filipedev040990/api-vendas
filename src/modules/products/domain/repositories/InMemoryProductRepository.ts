import Products from '@modules/products/infra/typeorm/entities/Products';
import { IProductRepository } from '@modules/products/domain/repositories/IProductRepository';
import { IProductRequest } from '@modules/products/services/CreateProductService';
import { IFindProducts } from '../models/IFindProducts';
import { IProduct } from '../models/IProduct';
import { IUpdateStockProduct } from '@modules/products/infra/typeorm/repositories/ProductsRepository';
import { uuid } from 'uuidv4';

export class InMemoryProductRepository
  implements Omit<IProductRepository, 'save' | 'remove' | 'updateStock'>
{
  private products: Products[] = [];

  public async findByName(name: string): Promise<IProduct | undefined> {
    return undefined;
  }

  public async findAllByIds(products: IFindProducts[]): Promise<IProduct[]> {
    return this.products;
  }

  public async find(): Promise<IProduct[]> {
    return this.products;
  }

  public async findbyId(id: string): Promise<IProduct | undefined> {
    return undefined;
  }

  public async create({
    name,
    price,
    quantity,
  }: IProductRequest): Promise<IProduct> {
    const product = new Products();
    product.id = uuid();
    product.name = name;
    product.price = price;
    product.quantity = quantity;

    this.products.push(product);
    return product;
  }

  public async save(product: IProduct): Promise<IProduct> {
    const findIndex = this.products.findIndex(
      findProduct => findProduct.id === product.id,
    );
    this.products[findIndex] = product;
    return product;
  }

  public async remove(id: string): Promise<void> {
    this.products = this.products.filter(product => product.id !== id);
  }

  public async updateStock(products: IUpdateStockProduct[]): Promise<void> {}
}

import { IProductRepository } from './../../../domain/repositories/IProductRepository';
import { In, Repository, getRepository } from 'typeorm';
import Products from '../entities/Products';
import { IFindProducts } from '@modules/products/domain/models/IFindProducts';
import { IProduct } from '@modules/products/domain/models/IProduct';
import { IProductRequest } from '@modules/products/services/CreateProductService';

export interface IUpdateStockProduct {
  id: string;
  quantity: number;
}

export class ProductRepository implements IProductRepository {
  private ormRepository: Repository<Products>;
  constructor() {
    this.ormRepository = getRepository(Products);
  }
  public async findByName(name: string): Promise<Products | undefined> {
    return this.ormRepository.findOne({ where: { name } });
  }

  public async findAllByIds(products: IFindProducts[]): Promise<Products[]> {
    const productId = products.map(product => product.id);
    return await this.ormRepository.find({ where: { id: In(productId) } });
  }

  public async find(): Promise<Products[]> {
    return this.ormRepository.find();
  }

  public async findbyId(id: string): Promise<Products | undefined> {
    return await this.ormRepository.findOne(id);
  }

  public async create({
    name,
    price,
    quantity,
  }: IProductRequest): Promise<Products> {
    const product = this.ormRepository.create({ name, price, quantity });
    return await this.ormRepository.save(product);
  }

  public async save(product: IProduct): Promise<Products> {
    return await this.ormRepository.save(product);
  }

  public async remove(id: string): Promise<void> {
    await this.ormRepository.delete(id);
  }

  public async updateStock(products: IUpdateStockProduct[]): Promise<void> {
    await this.ormRepository.save(products);
  }
}

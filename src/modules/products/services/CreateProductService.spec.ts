import 'reflect-metadata';
import AppError from '@shared/errors/AppError';
import CreateProductService from './CreateProductService';
import { InMemoryProductRepository } from '../domain/repositories/InMemoryProductRepository';

export type IProductRequest = {
  name: string;
  price: number;
  quantity: number;
};

describe('Create Product', () => {
  let inMemoryRepository: InMemoryProductRepository;
  let createProduct: CreateProductService;
  let input: IProductRequest;

  beforeEach(() => {
    inMemoryRepository = new InMemoryProductRepository();
    createProduct = new CreateProductService(inMemoryRepository);

    input = {
      name: 'Product name',
      price: 1000,
      quantity: 5,
    };
  });

  test('should be able to create a new Product', async () => {
    const newProduct = await createProduct.execute(input);

    expect(newProduct).toHaveProperty('id');
    expect(newProduct.name).toBe(input.name);
    expect(newProduct.price).toBe(input.price);
    expect(newProduct.quantity).toBe(input.quantity);
  });

  test('should not be able to create two products with equal name', async () => {
    await createProduct.execute(input);
    expect(createProduct.execute(input)).rejects.toBeInstanceOf(AppError);
  });

  test('should not be able to create a new Product if price is less zero', async () => {
    input.price = -1;
    await expect(createProduct.execute(input)).rejects.toBeInstanceOf(AppError);
  });

  test('should not be able to create a new Product if quantity is less zero', async () => {
    input.quantity = -1;
    await expect(createProduct.execute(input)).rejects.toBeInstanceOf(AppError);
  });
});

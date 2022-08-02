import 'reflect-metadata';
import UpdateProductService, {
  IUpdateProductRequest,
} from './UpdateProductService';
import { InMemoryProductRepository } from '../domain/repositories/InMemoryProductRepository';
//import AppError from '@shared/errors/AppError';

describe('Update Product', () => {
  let inMemoryRepository: InMemoryProductRepository;
  let updateProduct: UpdateProductService;
  let input: IUpdateProductRequest;

  beforeEach(() => {
    inMemoryRepository = new InMemoryProductRepository();
    updateProduct = new UpdateProductService(inMemoryRepository);

    input = {
      id: 'fakeId',
      name: 'New name',
      price: 500,
      quantity: 10,
    };
  });

  test('should be able to update a Product', async () => {
    const productUpdated = await updateProduct.execute(input);

    expect(productUpdated.name).toEqual(input.name);
    expect(productUpdated.price).toEqual(input.price);
    expect(productUpdated.quantity).toEqual(input.quantity);
  });
});

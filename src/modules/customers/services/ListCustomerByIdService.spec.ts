import 'reflect-metadata';
import AppError from '@shared/errors/AppError';
import ListCustomerById from './ListCustomerByIdService';
import { InMemoryCustomerRepository } from '../domain/repositories/InMemoryCustomerRepository';

describe('List Customer By Id', () => {
  let inMemoryRepository: InMemoryCustomerRepository;
  let listCustomer: ListCustomerById;

  beforeEach(() => {
    inMemoryRepository = new InMemoryCustomerRepository();
    listCustomer = new ListCustomerById(inMemoryRepository);
  });

  test('should be able find customer by id', async () => {
    const customer = await listCustomer.execute('123456');
    expect(customer?.id).toBe('123456');
  });
});

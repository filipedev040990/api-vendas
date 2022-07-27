import 'reflect-metadata';
import AppError from '@shared/errors/AppError';
import { InMemoryCustomerRepository } from './../domain/repositories/InMemoryCustomerRepository';
import CreateCustomerService from './CreateCustomerService';

describe('Create Customer', () => {
  let inMemoryRepository: InMemoryCustomerRepository;
  let createCustomer: CreateCustomerService;
  const payload = { name: 'Filipe', email: 'filipe@email.com' };

  beforeEach(() => {
    inMemoryRepository = new InMemoryCustomerRepository();
    createCustomer = new CreateCustomerService(inMemoryRepository);
  });

  test('should be able to create a new customer', async () => {
    const customer = await createCustomer.execute(payload);
    expect(customer).toHaveProperty('id');
  });

  test('should not be able to create two customer with same email', async () => {
    await createCustomer.execute(payload);
    expect(createCustomer.execute(payload)).rejects.toBeInstanceOf(AppError);
  });

  test('should not be able to create a new customer if name is empty', async () => {
    payload.name = '';
    expect(createCustomer.execute(payload)).rejects.toBeInstanceOf(AppError);
  });

  test('should not be able to create a new customer if email is empty', async () => {
    payload.email = '';
    expect(createCustomer.execute(payload)).rejects.toBeInstanceOf(AppError);
  });
});

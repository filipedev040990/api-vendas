import 'reflect-metadata';
import AppError from '@shared/errors/AppError';
import UpdateCustomerService from './UpdateCustomerService';
import CreateCustomerService from './CreateCustomerService';
import { InMemoryCustomerRepository } from '../domain/repositories/InMemoryCustomerRepository';

describe('Update Customer', () => {
  let inMemoryRepository: InMemoryCustomerRepository;
  let updateCustomer: UpdateCustomerService;
  let createCustomer: CreateCustomerService;

  const input = {
    id: '123456',
    name: 'Name updated',
    email: 'emailupdated@email.com',
  };

  beforeEach(() => {
    inMemoryRepository = new InMemoryCustomerRepository();
    updateCustomer = new UpdateCustomerService(inMemoryRepository);
    createCustomer = new CreateCustomerService(inMemoryRepository);
  });

  test('should be able to update a customer', async () => {
    const customerUpdated = await updateCustomer.execute(input);

    expect(customerUpdated.name).toEqual(input.name);
    expect(customerUpdated.email).toEqual(input.email);
  });

  test('should not be able to update a customer with email already used', async () => {
    await createCustomer.execute({
      name: 'New Customer',
      email: 'emailnewcustomer@email.com',
    });

    input.email = 'emailnewcustomer@email.com';

    expect(updateCustomer.execute(input)).rejects.toBeInstanceOf(AppError);
  });

  test('should not be able to update if customer does not exists', async () => {
    input.id = '-1';
    expect(updateCustomer.execute(input)).rejects.toBeInstanceOf(AppError);
  });
});

import AppError from '@shared/errors/AppError';
import 'reflect-metadata';
import CreateCustomerService from './CreateCustomerService';
import { InMemoryCustomerRepository } from '../domain/repositories/InMemoryCustomerRepository';

describe('CreateCustomerService', () => {
  test('should be able to create a new customer', async () => {
    const inMemoryCustomerRepository = new InMemoryCustomerRepository();
    const createCustomerService = new CreateCustomerService(
      inMemoryCustomerRepository,
    );

    const customer = await createCustomerService.execute({
      name: 'Filipe Siqueira',
      email: 'filipe@email.com.br',
    });
    expect(customer).toHaveProperty('id');
  });

  test('should not be able to create two customer with the same email', async () => {
    const inMemoryCustomerRepository = new InMemoryCustomerRepository();
    const createCustomerService = new CreateCustomerService(
      inMemoryCustomerRepository,
    );

    await createCustomerService.execute({
      name: 'Filipe Siqueira',
      email: 'filipe@email.com.br',
    });

    expect(
      createCustomerService.execute({
        name: 'Zé das Couves',
        email: 'filipe@email.com.br',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});

import AppError from '@shared/errors/AppError';
import 'reflect-metadata';
import DeleteCustomerService from './DeleteCustomerService';
import ListCustomerById from './ListCustomerByIdService';
import { InMemoryCustomerRepository } from '../domain/repositories/InMemoryCustomerRepository';

describe('Delete Customer', () => {
  let inMemoryRepository: InMemoryCustomerRepository;
  let deleteCustomer: DeleteCustomerService;
  let listCustomer: ListCustomerById;

  beforeEach(() => {
    inMemoryRepository = new InMemoryCustomerRepository();
    deleteCustomer = new DeleteCustomerService(inMemoryRepository);
    listCustomer = new ListCustomerById(inMemoryRepository);
  });
  test('should be able to remove a customer', async () => {
    await deleteCustomer.execute('123456');

    const customer = await listCustomer.execute('123456');
    expect(customer).toBeUndefined();
  });

  test('should not be able to remove a customer if id does not exists', async () => {
    expect(deleteCustomer.execute('-1')).rejects.toBeInstanceOf(AppError);
  });
});

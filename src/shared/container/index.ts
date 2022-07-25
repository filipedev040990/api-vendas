import { container } from 'tsyringe';

import { ICustomersRepository } from '@modules/customers/domain/repositories/ICustomersRepository';
import { CustomerRepository } from '@modules/customers/infra/typeorm/repositories/CustomersRepository';

container.registerSingleton<ICustomersRepository>(
  'CustomerRepository',
  CustomerRepository,
);

// import { IOrders } from '@modules/orders/domain/models/IOrders';
// import { OrdersRepository } from '@modules/orders/infra/typeorm/repositories/OrdersRepository';

// container.registerSingleton('OrdersRepository', OrdersRepository);

import { IProduct } from '@modules/orders/domain/models/IProduct-old';
import { ProductRepository } from '@modules/products/infra/typeorm/repositories/ProductsRepository';

container.registerSingleton<IProduct>('ProductRepository', ProductRepository);

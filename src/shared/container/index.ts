import { container } from 'tsyringe';

import { ICustomersRepository } from '@modules/customers/domain/repositories/ICustomersRepository';
import { CustomerRepository } from '@modules/customers/infra/typeorm/repositories/CustomersRepository';

container.registerSingleton<ICustomersRepository>(
  'CustomerRepository',
  CustomerRepository,
);

//import { IOrders } from '@modules/orders/domain/models/IOrders';
import { OrdersRepository } from '@modules/orders/infra/typeorm/repositories/OrdersRepository';

container.registerSingleton('OrdersRepository', OrdersRepository);

//import { ICreateOrderProducts } from '@modules/orders/domain/models/ICreateOrderProducts';
import { ProductRepository } from '@modules/products/infra/typeorm/repositories/ProductsRepository';

container.registerSingleton('ProductRepository', ProductRepository);

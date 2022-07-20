import { IOrders } from './../../../domain/models/IOrders';
import Customers from '@modules/customers/infra/typeorm/entities/Customers';
import {
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import OrdersProducts from './OrdersProducts';

@Entity('orders')
class Orders implements IOrders {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Customers)
  @JoinColumn({ name: 'customer_id' })
  customer_id: Customers;

  @OneToMany(() => OrdersProducts, order_products => order_products.order, {
    cascade: true,
  })
  order_products: OrdersProducts[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
export default Orders;

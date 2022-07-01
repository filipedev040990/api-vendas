import Products from '@modules/products/typeorm/entities/Products';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import Orders from './Orders';

@Entity('orders_products')
class OrdersProducts {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Orders, order => order.order_products)
  @JoinColumn({ name: 'order_id' })
  order: Orders;

  @ManyToOne(() => Products, product => product.order_products)
  @JoinColumn({ name: 'product_id' })
  product: Products;

  @Column('decimal')
  price: number;

  @Column('int')
  quantity: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default OrdersProducts;

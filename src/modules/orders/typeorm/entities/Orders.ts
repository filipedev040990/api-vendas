import Customers from '@modules/customers/typeorm/entities/Customers';
import {
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('orders')
class Orders {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Customers)
  @JoinColumn({ name: 'customer_id' })
  customer_id: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
export default Orders;

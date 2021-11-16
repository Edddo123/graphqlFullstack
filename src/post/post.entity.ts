import { Buyer } from '../buyer/buyer.entity';
import {
  Column,
  Entity,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class BuyerPost {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  propertyType: string; 

  @Column()
  price: number;

  @ManyToOne(() => Buyer, (buyer) => buyer.posts)
  buyer: Buyer;
}

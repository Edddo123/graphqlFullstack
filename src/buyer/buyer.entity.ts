import { BuyerPost } from '../post/post.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Buyer {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  location: string;

  @OneToMany(() => BuyerPost, buyerPost => buyerPost.buyer)
  posts: BuyerPost[]
}

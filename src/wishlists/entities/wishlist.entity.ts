import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
  OneToOne,
} from 'typeorm';
import { Length, IsUrl } from 'class-validator';
import { Wish } from '../../wishes/entities/wish.entity';
import { User } from '../../users/entities/user.entity';

@Entity()
export class Wishlist {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  updatedAt: Date;

  @Column()
  @Length(1, 250)
  name: string;

  @Column({ nullable: true })
  @Length(0, 1500)
  description: string;

  @Column()
  @IsUrl()
  image: string;

  @OneToOne(() => Wish, (Wish) => Wish.id)
  @JoinColumn()
  items: Wish[];

  @OneToOne(() => User, (User) => User.wishlists)
  @JoinColumn()
  owner: User;
}

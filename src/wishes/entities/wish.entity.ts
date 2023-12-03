import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  CreateDateColumn,
  JoinColumn,
  OneToMany,
  ManyToOne,
} from 'typeorm';
import { Length, IsUrl } from 'class-validator';
import { User } from '../../users/entities/user.entity';
import { Offer } from '../../offers/entities/offer.entity';

@Entity()
export class Wish {
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
  @Length(1, 250) // Ограничение длины от 1 до 250 символов
  name: string;

  @Column({ nullable: true })
  @IsUrl() // Проверка, что значение является URL
  link: string;

  @Column({ nullable: true })
  @IsUrl() // Проверка, что значение является URL
  image: string;

  @Column({ type: 'integer', default: 0 })
  price: number;

  @Column({ type: 'integer', default: 0 })
  raised: number;

  @ManyToOne(() => User, (User) => User.wishes)
  @JoinColumn()
  owner: User;

  @Column({ nullable: true })
  @Length(1, 1024) // Ограничение длины от 1 до 250 символов
  description: string;

  @OneToMany(() => Offer, (Offer) => Offer.item)
  offers: Offer[];

  @Column({ type: 'integer', default: 0 })
  copied: number;
}

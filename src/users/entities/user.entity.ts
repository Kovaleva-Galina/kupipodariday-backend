import { Wish } from 'src/wishes/entities/wish.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  JoinColumn,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { IsNotEmpty, Length, IsUrl, IsEmail } from 'class-validator';
import { Offer } from 'src/offers/entities/offer.entity';
import { Wishlist } from 'src/wishlists/entities/wishlist.entity';

@Entity()
export class User {
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

  @Column({ unique: true })
  @Length(2, 30) // Ограничение длины от 2 до 30 символов
  @IsNotEmpty() // Обязательное поле
  username: string;

  @Column({ nullable: true })
  @Length(2, 200) // Ограничение длины от 2 до 200 символов
  about: string;

  @Column({ default: 'https://i.pravatar.cc/300' })
  @IsUrl() // Проверка, что значение является URL
  avatar: string;

  @Column({ unique: true })
  @IsEmail() // Проверка, что значение является действительным адресом электронной почты
  email: string;

  @Column({ select: false })
  password: string;

  @OneToMany(() => Wish, (Wish) => Wish.owner)
  wishes: Wish[];

  @OneToMany(() => Offer, (Offer) => Offer.user)
  @JoinColumn()
  offers: Offer[];

  @OneToMany(() => Wishlist, (Wishlist) => Wishlist.owner)
  @JoinColumn()
  wishlists: Wishlist[];
}

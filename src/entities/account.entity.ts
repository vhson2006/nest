import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Account {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  email: string;

  @Column()
  name: string;

  @Column()
  phone: string;

  @Column()
  address: string;

  @Column('text')
  aboutUs: string;

  @Column()
  wcode: string;

  @Column()
  contactUsImage: string;

  @Column()
  password: string;

  @Column()
  avatar: string;

  @Column()
  background: string;
}

import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Service {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  jumbotronTitle: string;

  @Column()
  serviceImage: string;

  @Column()
  mainTitle: string;

  @Column()
  accountId: string;
}

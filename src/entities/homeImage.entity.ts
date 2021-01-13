import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class HomeImage {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  position: string;

  @Column()
  accountId: string;

  @Column()
  imageId: string;
}

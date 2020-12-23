import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class HomeImage {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  homeId: string;

  @Column()
  imageId: string;
}

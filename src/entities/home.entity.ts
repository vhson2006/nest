import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Home {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  jumbotronTitle: string;

  @Column()
  mainTitle: string;

  @Column('text')
  mainParagraph: string;

  @Column('text')
  sideParagraph: string;

  @Column()
  subTitle: string;

  @Column('text')
  subParagraph: string;

  @Column()
  accountId: string;
}

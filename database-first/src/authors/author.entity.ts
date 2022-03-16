import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class AuthorEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  genre: string;
}

import { User } from './../sequelize-trying/users.model';
import {
  Column,
  Model,
  Table,
  DataType,
  AutoIncrement,
  BelongsTo,
  ForeignKey,
} from 'sequelize-typescript';

@Table
export class PublicFile extends Model {
  @Column({ primaryKey: true, type: DataType.UUID })
  id: string;

  @Column
  url: string;

  @Column
  key: string;

  @Column
  bucket: string;

  @Column
  eTag: string;

  @AutoIncrement
  @Column
  num: number;

  @ForeignKey(() => User)
  @Column({ type: DataType.UUID })
  userId: string;

  @BelongsTo(() => User)
  user: User;
}

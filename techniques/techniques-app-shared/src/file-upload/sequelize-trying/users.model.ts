import { Column, Model, Table, DataType, HasMany } from 'sequelize-typescript';
import { PublicFile } from '../entities/publicFile.entity';

//https://github.com/RobinBuschmann/sequelize-typescript

//A primary key (id) will be inherited from base class Model.
//This primary key is by default an INTEGER and has autoIncrement=true
//(This behaviour is a native sequelize thing)

@Table
export class User extends Model {
  @Column({ primaryKey: true, type: DataType.UUID })
  id: string;

  @Column
  firstName: string;

  @Column
  lastName: string;

  @Column({ defaultValue: true })
  isActive: boolean;

  @HasMany(() => PublicFile)
  photos?: PublicFile[];

  //provided by google
  @Column({ type: DataType.STRING, unique: true })
  email: string;

  @Column
  pictureUrl: string;

  @Column
  googleJwtToken: string;
}

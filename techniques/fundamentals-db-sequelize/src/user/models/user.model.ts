import { Column, Model, Table } from 'sequelize-typescript';

//https://www.npmjs.com/package/sequelize-typescript

@Table
export class User extends Model {
  @Column
  firstName: string;

  @Column
  lastName: string;

  @Column({ defaultValue: true })
  isActive: boolean;
}

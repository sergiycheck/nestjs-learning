import { BaseEntity } from 'src/base/entities/base-entities';

export class Article extends BaseEntity {
  public id: number;
  public isPublished: boolean;
  public authorId: number;

  constructor(attrs: any) {
    super(attrs);
  }
}

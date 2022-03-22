import { PickType } from '@nestjs/mapped-types';
import { Article } from '../entities/article.entity';

export class CreateArticleDto extends PickType(Article, [
  'isPublished',
  'authorId',
] as const) {}

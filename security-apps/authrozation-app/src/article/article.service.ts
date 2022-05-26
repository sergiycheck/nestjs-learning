import { Injectable } from '@nestjs/common';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { Article } from './entities/article.entity';

@Injectable()
export class ArticleService {
  private articles: Article[] = [
    { id: 1, isPublished: true, authorId: 1 },
    { id: 2, isPublished: true, authorId: 1 },
    { id: 3, isPublished: false, authorId: 1 },
    { id: 4, isPublished: true, authorId: 2 },
    { id: 5, isPublished: false, authorId: 2 },
    { id: 6, isPublished: true, authorId: 3 },
  ];

  create(createArticleDto: CreateArticleDto) {
    let lastId = this.articles.slice().pop().id;
    this.articles.push({ id: ++lastId, ...createArticleDto });
    return this.articles.slice().pop();
  }

  findAll() {
    return this.articles.slice();
  }

  findOne(id: number) {
    return `This action returns a #${id} article`;
  }

  update(id: number, updateArticleDto: UpdateArticleDto) {
    return `This action updates a #${id} article ${JSON.stringify(
      updateArticleDto,
    )}`;
  }

  remove(id: number) {
    return `This action removes a #${id} article`;
  }
}

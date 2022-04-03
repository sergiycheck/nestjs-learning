import { AppAbility } from './casl-ability.factory';
import { Article } from 'src/article/entities/article.entity';

export interface IPolicyHandler {
  handle(ability: AppAbility, article: Article): boolean;
}

export type PolicyHandlerCallback = (ability: AppAbility) => boolean;

export type PolicyHandler = IPolicyHandler | PolicyHandlerCallback;

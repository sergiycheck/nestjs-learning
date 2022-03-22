import { AppAbility } from 'src/casl/casl-ability.factory';
import { IPolicyHandler } from './policy-handler';
import { ActionAbility } from 'src/authorization/actions.enum';
import { Article } from 'src/article/entities/article.entity';

//TODO: fix ability.can method bug
//user cannot update another article
// user can update own article

export class ReadArticlePolicyHandler implements IPolicyHandler {
  handle(ability: AppAbility, article: Article) {
    return ability.can(ActionAbility.Read, Article);
  }
}

export class UpdateArticlePolicyHandler implements IPolicyHandler {
  handle(ability: AppAbility, article: Article) {
    return ability.can(ActionAbility.Update, Article);
  }
}

//TODO: leave a issue or a feedback on nestjs github about not working examples from docs
//https://docs.nestjs.com/security/authorization#integrating-casl

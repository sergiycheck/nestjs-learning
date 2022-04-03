import { AppAbility } from 'src/casl/casl-ability.factory';
import { IPolicyHandler } from './policy-handler';
import { ActionAbility } from 'src/authorization/actions.enum';
import { Article } from 'src/article/entities/article.entity';

export class ReadArticlePolicyHandler implements IPolicyHandler {
  handle(ability: AppAbility, article: Article) {
    const abilityRes = ability.can(ActionAbility.Read, article);
    return abilityRes;
  }
}

export class UpdateArticlePolicyHandler implements IPolicyHandler {
  handle(ability: AppAbility, article: Article) {
    const abilityRes = ability.can(ActionAbility.Update, article);
    return abilityRes;
  }
}

import {
  InferSubjects,
  Ability,
  AbilityBuilder,
  AbilityClass,
  ExtractSubjectType,
} from '@casl/ability';
import { ActionAbility } from 'src/authorization/actions.enum';
import { Article } from 'src/articles/entities/article.entity';
import { User } from '../users/entities/user.entity';
import { Injectable } from '@nestjs/common';

type Subjects = InferSubjects<typeof Article | typeof User> | 'all';

export type AppAbility = Ability<[ActionAbility, Subjects]>;

@Injectable()
export class CaslAbilityFactory {
  createForUser(user: User) {
    const { can, cannot, build } = new AbilityBuilder(
      Ability as AbilityClass<AppAbility>,
    );

    if (user.isAdmin) {
      can(ActionAbility.Manage, 'all'); //read-write access to everything
    } else {
      can(ActionAbility.Read, 'all'); //read-only access to everything
    }

    can(ActionAbility.Update, Article, { authorId: user.userId });
    cannot(ActionAbility.Delete, Article, { isPublished: true });

    return build({
      // read https://casl.js.org/v5/en/guide/subject-type-detection#use-classes-as-subject-types for details
      detectSubjectType: (item) =>
        item.constructor as ExtractSubjectType<Subjects>,
    });
  }
}

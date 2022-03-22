import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AppAbility, CaslAbilityFactory } from './casl-ability.factory';
import { PolicyHandler } from './policy-handler';
import { CHECK_POLICIES_KEY } from './check-policies.decorat';
import { User } from 'src/users/entities/user.entity';
import { Article } from 'src/article/entities/article.entity';

@Injectable()
export class PoliciesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private caslAbilityFactory: CaslAbilityFactory,
  ) {}

  canActivate(context: ExecutionContext): boolean {
    //policyHandlers is an arr of handlers assigned to
    // the method through the @CheckPolicies() decorator
    const policyHandlers =
      this.reflector.get<PolicyHandler[]>(
        CHECK_POLICIES_KEY,
        context.getHandler(),
      ) || [];

    const { user, body }: { user: User; body: Article } = context
      .switchToHttp()
      .getRequest();

    //Ability obj allowing us to verify whether a user has
    // sufficient permissions to perform specific actions
    const ability = this.caslAbilityFactory.createForUser(user);

    const policiesHandlersRes = policyHandlers.every((handler) =>
      this.execPolicyHandler(handler, ability, body),
    );

    return policiesHandlersRes;
  }

  private execPolicyHandler(
    handler: PolicyHandler,
    ability: AppAbility,
    article: Article,
  ) {
    if (typeof handler === 'function') {
      const abilityFuncRes = handler(ability);
      return abilityFuncRes;
    }

    const abilityHandlerRes = handler.handle(ability, article);
    return abilityHandlerRes;
  }
}

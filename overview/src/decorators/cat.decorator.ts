import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const CatPropDecorator = createParamDecorator(
  (data: string, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const { body } = request;
    return data ? body?.[data] : body;
  },
);

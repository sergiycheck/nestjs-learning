import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();

    //if the currently processed request is a POST request, bound to the create() method on the CatsController
    //getHandler() return a reference to the create() method and getClass() returns the CatsController type

    const methodKey = context.getHandler().name;
    console.log(`methodKey ${methodKey}`); // "create"
    const className = context.getClass().name; // "CatsController"
    console.log(`controller ${className}`);

    return this.validateRequest(request);
  }

  //stub method
  private validateRequest(req: any) {
    return req ? true : false;
  }
}

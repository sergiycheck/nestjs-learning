// import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
// import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
// import { RolesGuard } from './roles.guard';

//TODO: get user from jwt token

// @Injectable()
// export class AppGlobalCustomGuard implements CanActivate {
//   constructor(private jwtGuard: JwtAuthGuard, private rolesGuard: RolesGuard) {}

//   canActivate(context: ExecutionContext) {
//     const canBeJwtActivated = this.jwtGuard.canActivate(context);

//     const canBeRoleActivated = this.rolesGuard.canActivate(context);

//     const res = canBeJwtActivated && canBeRoleActivated;
//     return res;
//   }
// }

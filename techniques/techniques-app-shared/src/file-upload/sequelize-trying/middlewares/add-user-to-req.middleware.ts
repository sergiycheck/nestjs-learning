import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { UsersService } from '../users.service';
import { User } from './../users.model';

declare module 'express-session' {
  interface SessionData {
    userId?: string | undefined;
    user?: User | undefined;
  }
}

declare module 'express' {
  interface Request {
    user: User;
  }
}

@Injectable()
export class AddUserToReqMiddleware implements NestMiddleware {
  constructor(private usersService: UsersService) {}
  async use(req: Request, res: Response, next: NextFunction) {
    const userId = req.session?.userId;
    if (userId) {
      let user = await this.usersService.findOne(userId);
      user = this.usersService.getPojo(user);
      req.user = user;
    }
    next();
  }
}

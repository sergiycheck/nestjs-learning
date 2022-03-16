import {
  Injectable,
  OnApplicationShutdown,
  OnModuleInit,
} from '@nestjs/common';

@Injectable()
export class UsersService implements OnModuleInit, OnApplicationShutdown {
  private logMsg(msg) {
    console.log(`module hooks UsersService.`, msg);
  }

  onModuleInit() {
    this.logMsg('The module has been init.');
  }

  onApplicationShutdown(signal?: string) {
    this.logMsg(`signal: ${signal}`);
  }
}

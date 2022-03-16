import { Get, Controller, HostParam } from '@nestjs/common';

@Controller({ host: ':account.example.com' })
export class AdminController {
  @Get()
  getInfo(@HostParam('param') account: string) {
    return `${account} info`;
  }
}

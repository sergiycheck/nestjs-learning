import { Body, Controller, Get, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { AppSenderService } from './app-sender.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppSenderService) {}

  @Post('replace-emoji')
  getHello(@Body() msgObj: { message: string }, @Res() res: Response) {
    this.appService.sendReplaceEmojiMsg(msgObj.message).subscribe((result) => {
      console.log('result', result);

      return res.json(result);
    });
  }
}

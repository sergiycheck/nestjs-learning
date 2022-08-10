import {
  Body,
  Controller,
  Get,
  ParseArrayPipe,
  Post,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { AppService } from './app.service';
import { SendGetMsgDto, CreateOrderDto, NumberDto } from './dto/dtos.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('send-get-msg')
  sendAndGetMsg(@Body() sendGetMsgDto: SendGetMsgDto, @Res() res: Response) {
    return this.appService
      .sendAndGetHelloMessage(sendGetMsgDto)
      .subscribe((result) => {
        res.json({
          result,
        });
      });
  }

  // use server send events to send all responses?
  @Post('send-get-nums')
  sendAndGetNums(
    @Body(new ParseArrayPipe({ items: NumberDto })) numsDto: NumberDto[],
  ) {
    const nums = numsDto.map((nD) => nD.item);
    return this.appService.sendNumsAndGet(nums);
  }

  @Post('create-order')
  publishCreateOrder(@Body() createOrderDto: CreateOrderDto) {
    return this.appService.publishOrderCreated(createOrderDto);
  }
}

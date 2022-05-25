import { OrderEventsService } from './order.service';
import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateOrderDto } from './dtos/order-dtos.dto';

@ApiTags('OrderEventsController')
@Controller('orders')
export class OrderEventsController {
  constructor(private orderService: OrderEventsService) {}
  @Post()
  create(@Body() createDto: CreateOrderDto) {
    return this.orderService.create(createDto);
  }

  @Get()
  findAll() {
    return this.orderService.findAll();
  }
}

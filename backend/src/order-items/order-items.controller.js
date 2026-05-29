const {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Inject,
  UseGuards,
} = require('@nestjs/common');
const { AuthGuard } = require('../auth/auth.guard');
const { OrderItemsService } = require('./order-items.service');

@Controller('order-items')
class OrderItemsController {
  constructor(@Inject(OrderItemsService) orderItemsService) {
    this.orderItemsService = orderItemsService;
  }

  @UseGuards(AuthGuard)
  @Post()
  create(@Body() createOrderItemDto) {
    return this.orderItemsService.create(createOrderItemDto);
  }

  @Get()
  findAll() {
    return this.orderItemsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id) {
    return this.orderItemsService.findOne(+id);
  }

  @Delete(':id')
  remove(@Param('id') id) {
    return this.orderItemsService.remove(+id);
  }
}

module.exports = { OrderItemsController };

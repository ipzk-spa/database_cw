const {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Inject,
  UseGuards,
  Request,
  UnauthorizedException,
} = require('@nestjs/common');
const { OrdersService } = require('./orders.service');
const { AuthGuard } = require('../auth/auth.guard');

@Controller('orders')
class OrdersController {
  constructor(@Inject(OrdersService) ordersService) {
    this.ordersService = ordersService;
  }

  @UseGuards(AuthGuard)
  @Post()
  create(@Body() createOrderDto, @Request() request) {
    if (+createOrderDto.user_id !== request.user.userId) {
      throw new UnauthorizedException('Invalid user for order.');
    }
    return this.ordersService.create(createOrderDto);
  }

  @Get()
  findAll() {
    return this.ordersService.findAll();
  }

  @UseGuards(AuthGuard)
  @Get('user/:userId')
  findByUser(@Param('userId') userId, @Request() request) {
    if (request.user.userId !== +userId) {
      throw new UnauthorizedException('Access denied.');
    }
    return this.ordersService.findByUserId(+userId);
  }

  @Get(':id')
  findOne(@Param('id') id) {
    return this.ordersService.findOne(+id);
  }

  @Delete(':id')
  remove(@Param('id') id) {
    return this.ordersService.remove(+id);
  }
}

module.exports = { OrdersController };

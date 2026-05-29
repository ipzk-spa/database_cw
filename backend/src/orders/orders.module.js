const { forwardRef, Module } = require('@nestjs/common');
const { TypeOrmModule } = require('@nestjs/typeorm');
const { OrdersService } = require('./orders.service');
const { OrdersController } = require('./orders.controller');
const { Order } = require('./entities/order.entity');
const { UsersModule } = require('../users/users.module');

@Module({
  imports: [
    TypeOrmModule.forFeature([Order]),
    forwardRef(() => UsersModule),
  ],
  controllers: [OrdersController],
  providers: [OrdersService],
  exports: [OrdersService],
})
class OrdersModule {}

module.exports = { OrdersModule };

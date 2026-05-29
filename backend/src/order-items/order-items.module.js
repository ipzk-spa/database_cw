const { forwardRef, Module } = require('@nestjs/common');
const { TypeOrmModule } = require('@nestjs/typeorm');
const { OrderItemsService } = require('./order-items.service');
const { OrderItemsController } = require('./order-items.controller');
const { OrderItem } = require('./entities/order-item.entity');
const { OrdersModule } = require('../orders/orders.module');
const { AlcoholModule } = require('../alcohol/alcohol.module');

@Module({
  imports: [
    TypeOrmModule.forFeature([OrderItem]),
    forwardRef(() => OrdersModule),
    forwardRef(() => AlcoholModule),
  ],
  controllers: [OrderItemsController],
  providers: [OrderItemsService],
})
class OrderItemsModule {}

module.exports = { OrderItemsModule };

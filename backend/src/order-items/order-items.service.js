const { Inject, Injectable, NotFoundException } = require('@nestjs/common');
const { InjectRepository } = require('@nestjs/typeorm');
const { Repository } = require('typeorm');
const { OrderItem } = require('./entities/order-item.entity');
const { AlcoholService } = require('../alcohol/alcohol.service');
const { OrdersService } = require('../orders/orders.service');

@Injectable()
class OrderItemsService {
  constructor(
    @InjectRepository(OrderItem)
    orderItemRepository,
    @Inject(AlcoholService)
    alcoholService,
    @Inject(OrdersService)
    orderService,
  ) {
    this.orderItemRepository = orderItemRepository;
    this.alcoholService = alcoholService;
    this.orderService = orderService;
  }

  async create(createOrderItemDto) {
    const alcohol = await this.alcoholService.findOne(
      createOrderItemDto.alcohol_id,
    );

    const order = await this.orderService.findOne(createOrderItemDto.order_id);

    const orderItem = this.orderItemRepository.create({
      ...createOrderItemDto,
      alcohol,
      order,
    });

    return await this.orderItemRepository.save(orderItem);
  }

  async findAll() {
    return await this.orderItemRepository.find({
      relations: ['alcohol', 'order'],
    });
  }

  async findOne(id) {
    try {
      return await this.orderItemRepository.findOneOrFail({
        where: { id },
        relations: ['alcohol', 'order'],
      });
    } catch (error) {
      throw new NotFoundException(`Order item not found by id ${id}.`);
    }
  }

  async remove(id) {
    return this.orderItemRepository.delete(id);
  }
}

module.exports = { OrderItemsService };

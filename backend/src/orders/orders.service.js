const { Inject, Injectable, NotFoundException } = require('@nestjs/common');
const { InjectRepository } = require('@nestjs/typeorm');
const { Repository } = require('typeorm');
const { Order } = require('./entities/order.entity');
const { UsersService } = require('../users/users.service');

@Injectable()
class OrdersService {
  constructor(
    @InjectRepository(Order)
    orderRepository,
    @Inject(UsersService)
    userService,
  ) {
    this.orderRepository = orderRepository;
    this.userService = userService;
  }

  async create(createOrderDto) {
    const user = await this.userService.findOne(createOrderDto.user_id);

    const order = this.orderRepository.create({
      ...createOrderDto,
      user,
    });

    return await this.orderRepository.save(order);
  }

  async findAll() {
    return await this.orderRepository.find({
      relations: ['user', 'orderItems', 'orderItems.alcohol'],
      order: { created_at: 'DESC' },
    });
  }

  async findByUserId(userId) {
    return await this.orderRepository.find({
      where: { user: { id: userId } },
      relations: ['orderItems', 'orderItems.alcohol'],
      order: { created_at: 'DESC' },
    });
  }

  async findOne(id) {
    try {
      return await this.orderRepository.findOneOrFail({
        where: { id },
        relations: { user: true, orderItems: { alcohol: true } },
      });
    } catch (error) {
      throw new NotFoundException(`Order not found by id ${id}.`);
    }
  }

  async remove(id) {
    await this.findOne(id);
    return await this.orderRepository.delete(id);
  }
}

module.exports = { OrdersService };

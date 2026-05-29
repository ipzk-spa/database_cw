const {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} = require('typeorm');

@Entity({ name: 'orderItems' })
class OrderItem {
  @PrimaryGeneratedColumn('increment')
  id;

  @ManyToOne(
    () => require('../../alcohol/entities/alcohol.entity').Alcohol,
    (alcohol) => alcohol.orderItems,
  )
  alcohol;

  @ManyToOne(
    () => require('../../orders/entities/order.entity').Order,
    (order) => order.orderItems,
  )
  order;

  @Column({ type: 'int', name: 'quantity', nullable: false, default: 1 })
  quantity;

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
    name: 'price',
    nullable: false,
  })
  price;
}

module.exports = { OrderItem };

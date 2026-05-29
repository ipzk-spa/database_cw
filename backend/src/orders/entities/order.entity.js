const {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} = require('typeorm');

@Entity({ name: 'orders' })
class Order {
  @PrimaryGeneratedColumn('increment')
  id;

  @ManyToOne(
    () => require('../../users/entities/user.entity').User,
    (user) => user.orders,
  )
  user;

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
    name: 'total_price',
    nullable: false,
  })
  total_price;

  @CreateDateColumn({ type: 'timestamp', name: 'created_at', nullable: false })
  created_at;

  @OneToMany(
    () => require('../../order-items/entities/order-item.entity').OrderItem,
    (orderItem) => orderItem.order,
  )
  orderItems;
}

module.exports = { Order };

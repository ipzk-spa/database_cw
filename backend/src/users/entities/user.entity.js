const { Role } = require('../../enums/role.enum');
const {
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} = require('typeorm');

@Entity({ name: 'users' })
class User {
  @PrimaryGeneratedColumn('increment')
  id;

  @Column({ type: 'varchar', length: 30, name: 'first_name', nullable: false })
  first_name;

  @Column({ type: 'varchar', length: 30, name: 'last_name', nullable: false })
  last_name;

  @Column({
    type: 'varchar',
    length: 50,
    name: 'email',
    nullable: false,
    unique: true,
  })
  email;

  @Column({ type: 'varchar', length: 255, name: 'password', nullable: false })
  password;

  @Column({
    type: 'enum',
    enum: Object.values(Role),
    enumName: 'UserRole',
    default: 'User',
  })
  role;

  @OneToMany(
    () => require('../../orders/entities/order.entity').Order,
    (order) => order.user,
  )
  orders;
}

module.exports = { User };

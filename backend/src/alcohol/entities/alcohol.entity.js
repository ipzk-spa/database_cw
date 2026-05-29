const { Countries } = require('../../enums/countries.enum');
const { TypeAlcohol } = require('../../enums/typeAlcohol.enum');
const {
  Column,
  Entity,
  Generated,
  OneToMany,
  PrimaryGeneratedColumn,
} = require('typeorm');

@Entity({ name: 'alcohol' })
class Alcohol {
  @PrimaryGeneratedColumn('increment')
  id;

  @Column({ type: 'uuid', name: 'item_code', nullable: false, unique: true })
  @Generated('uuid')
  item_code;

  @Column({ type: 'varchar', length: 100, name: 'brand', nullable: false })
  brand;

  @Column({
    type: 'enum',
    enum: Object.values(Countries),
    name: 'countries',
    nullable: false,
  })
  countries;

  @Column({
    type: 'enum',
    enum: Object.values(TypeAlcohol),
    name: 'type_alcohol',
    nullable: false,
  })
  type_alcohol;

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
    name: 'volume',
    nullable: false,
  })
  volume;

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
    name: 'durability',
    nullable: false,
  })
  durability;

  @Column({
    type: 'boolean',
    name: 'availability',
    nullable: false,
    default: true,
  })
  availability;

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
    name: 'cost',
    nullable: false,
  })
  cost;

  @Column({ type: 'text', name: 'description', nullable: false })
  description;

  @Column({ type: 'varchar', length: 255, name: 'file', nullable: false })
  file;

  @OneToMany(
    () => require('../../order-items/entities/order-item.entity').OrderItem,
    (orderItems) => orderItems.alcohol,
    { onDelete: 'CASCADE' },
  )
  orderItems;
}

module.exports = { Alcohol };

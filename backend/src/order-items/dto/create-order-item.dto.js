const { IsInt, IsNotEmpty, IsNumber } = require('class-validator');

class CreateOrderItemDto {
  @IsInt()
  @IsNotEmpty()
  alcohol_id;

  @IsInt()
  @IsNotEmpty()
  order_id;

  @IsInt()
  @IsNotEmpty()
  quantity;

  @IsNumber({ maxDecimalPlaces: 2 })
  @IsNotEmpty()
  price;
}

module.exports = { CreateOrderItemDto };

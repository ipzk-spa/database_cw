const { IsInt, IsNotEmpty, IsNumber } = require('class-validator');

class CreateOrderDto {
  @IsInt()
  @IsNotEmpty()
  user_id;

  @IsNumber({ maxDecimalPlaces: 2 })
  @IsNotEmpty()
  total_price;
}

module.exports = { CreateOrderDto };

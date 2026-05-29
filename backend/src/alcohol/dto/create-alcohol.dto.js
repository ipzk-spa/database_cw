const { Transform } = require('class-transformer');
const {
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} = require('class-validator');
const { Countries } = require('../../enums/countries.enum');
const { TypeAlcohol } = require('../../enums/typeAlcohol.enum');

class CreateAlcoholDto {
  @IsString()
  @IsNotEmpty()
  brand;

  @IsEnum(Countries)
  @IsNotEmpty()
  countries;

  @IsEnum(TypeAlcohol)
  @IsNotEmpty()
  type_alcohol;

  @IsNumber({ maxDecimalPlaces: 2 })
  @IsNotEmpty()
  @Transform(({ value }) => Number(value))
  volume;

  @IsNumber({ maxDecimalPlaces: 2 })
  @IsNotEmpty()
  @Transform(({ value }) => Number(value))
  durability;

  @IsBoolean()
  @IsOptional()
  availability;

  @IsNumber({ maxDecimalPlaces: 2 })
  @IsNotEmpty()
  @Transform(({ value }) => Number(value))
  cost;

  @IsString()
  @IsNotEmpty()
  description;

  @IsOptional()
  file;
}

module.exports = { CreateAlcoholDto };

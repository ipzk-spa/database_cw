const { Transform } = require('class-transformer');
const {
  IsBoolean,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
} = require('class-validator');
const { Countries } = require('../../enums/countries.enum');
const { TypeAlcohol } = require('../../enums/typeAlcohol.enum');

class FilterAlcoholDto {
  @IsString()
  @IsOptional()
  item_code;

  @IsString()
  @IsOptional()
  brand;

  @IsEnum(Countries, { each: true })
  @IsOptional()
  @Transform(({ value }) => (Array.isArray(value) ? value : [value]))
  countries;

  @IsEnum(TypeAlcohol, { each: true })
  @IsOptional()
  @Transform(({ value }) => (Array.isArray(value) ? value : [value]))
  type_alcohol;

  @IsNumber({ maxDecimalPlaces: 2 }, { each: true })
  @IsOptional()
  @Transform(({ value }) => parseFloat(value))
  @Transform(({ value }) => (Array.isArray(value) ? value : [value]))
  volume;

  @IsNumber({ maxDecimalPlaces: 2 }, { each: true })
  @IsOptional()
  @Transform(({ value }) => parseFloat(value))
  @Transform(({ value }) => (Array.isArray(value) ? value : [value]))
  durability;

  @IsBoolean()
  @IsOptional()
  availability;

  @IsNumber({ maxDecimalPlaces: 2 })
  @IsOptional()
  @Transform(({ value }) => parseFloat(value))
  @Transform(({ value }) => (Array.isArray(value) ? value : [value]))
  cost;

  @IsString()
  @IsOptional()
  description;
}

module.exports = { FilterAlcoholDto };

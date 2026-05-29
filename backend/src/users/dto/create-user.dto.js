const {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
} = require('class-validator');
const { Role } = require('../../enums/role.enum');

class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  first_name;

  @IsString()
  @IsNotEmpty()
  last_name;

  @IsEmail()
  @IsNotEmpty()
  email;

  @IsString()
  @IsNotEmpty()
  password;

  @IsEnum(Role)
  @IsOptional()
  role;
}

module.exports = { CreateUserDto };

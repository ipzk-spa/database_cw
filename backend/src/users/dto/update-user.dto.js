const { IsEmail, IsOptional, IsString } = require('class-validator');

class UpdateUserDto {
  @IsString()
  @IsOptional()
  first_name;

  @IsString()
  @IsOptional()
  last_name;

  @IsEmail()
  @IsOptional()
  email;
}

module.exports = { UpdateUserDto };

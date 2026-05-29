const { IsNotEmpty, IsString } = require('class-validator');

class UpdatePasswordUserDto {
  @IsString()
  @IsNotEmpty()
  oldPassword;

  @IsString()
  @IsNotEmpty()
  newPassword;

  @IsString()
  @IsNotEmpty()
  confirmPassword;
}

module.exports = { UpdatePasswordUserDto };

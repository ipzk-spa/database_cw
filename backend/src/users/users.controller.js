const {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
  UnauthorizedException,
  Inject,
} = require('@nestjs/common');
const { UsersService } = require('./users.service');
const { CreateUserDto } = require('./dto/create-user.dto');
const { UpdateUserDto } = require('./dto/update-user.dto');
const { UpdatePasswordUserDto } = require('./dto/update-password-user.dto');
const { AuthGuard } = require('../auth/auth.guard');

@Controller('users')
class UsersController {
  constructor(@Inject(UsersService) usersService) {
    this.usersService = usersService;
  }

  @Post()
  create(@Body() createUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  findOne(@Param('id') id, @Request() request) {
    if (request.user.userId !== +id) {
      throw new UnauthorizedException(`User with ${id} id not valid.`);
    }

    return this.usersService.findOneSafe(+id);
  }

  @UseGuards(AuthGuard)
  @Patch(':id')
  update(@Param('id') id, @Body() updateUserDto, @Request() request) {
    if (request.user.userId !== +id) {
      throw new UnauthorizedException(`User with ${id} id not valid.`);
    }
    return this.usersService.update(+id, updateUserDto);
  }

  @UseGuards(AuthGuard)
  @Patch('update-password/:id')
  updatePassword(
    @Param('id') id,
    @Body() updatePasswordUserDto,
    @Request() request,
  ) {
    if (request.user.userId !== +id) {
      throw new UnauthorizedException(`User with ${id} id not valid.`);
    }
    return this.usersService.updatePassword(+id, updatePasswordUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id) {
    return this.usersService.remove(+id);
  }
}

module.exports = { UsersController };

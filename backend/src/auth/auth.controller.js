const {
  Controller,
  Post,
  Body,
  Get,
  UseGuards,
  Request,
  Inject,
} = require('@nestjs/common');
const { AuthService } = require('./auth.service');
const { AuthGuard } = require('./auth.guard');

@Controller('auth')
class AuthController {
  constructor(@Inject(AuthService) authService) {
    this.authService = authService;
  }

  @Post('login')
  create(@Body() input) {
    return this.authService.authenticate(input);
  }

  @UseGuards(AuthGuard)
  @Get('me')
  getUserInfo(@Request() request) {
    return request.user;
  }
}

module.exports = { AuthController };

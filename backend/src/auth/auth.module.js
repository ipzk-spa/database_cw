const { forwardRef, Module } = require('@nestjs/common');
const { AuthService } = require('./auth.service');
const { AuthController } = require('./auth.controller');
const { AuthGuard } = require('./auth.guard');

@Module({
  imports: [forwardRef(() => require('../users/users.module').UsersModule)],
  controllers: [AuthController],
  providers: [AuthService, AuthGuard],
  exports: [AuthService, AuthGuard],
})
class AuthModule {}

module.exports = { AuthModule };

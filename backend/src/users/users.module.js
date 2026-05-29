const { forwardRef, Module } = require('@nestjs/common');
const { TypeOrmModule } = require('@nestjs/typeorm');
const { UsersService } = require('./users.service');
const { UsersController } = require('./users.controller');
const { User } = require('./entities/user.entity');
@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    forwardRef(() => require('../auth/auth.module').AuthModule),
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
class UsersModule {}

module.exports = { UsersModule };

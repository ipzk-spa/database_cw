const { Module } = require('@nestjs/common');
const { AppController } = require('./app.controller');
const { AppService } = require('./app.service');
const { UsersModule } = require('./users/users.module');
const { DatabaseModule } = require('./database/database.module');
const { ConfigModule } = require('@nestjs/config');
const { OrdersModule } = require('./orders/orders.module');
const { OrderItemsModule } = require('./order-items/order-items.module');
const { AlcoholModule } = require('./alcohol/alcohol.module');
const { AuthModule } = require('./auth/auth.module');
const { JwtModule } = require('@nestjs/jwt');
const { ServeStaticModule } = require('@nestjs/serve-static');
const { join } = require('path');

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET || 'default',
      signOptions: { expiresIn: '1h' },
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads'),
      serveRoot: '/uploads',
    }),
    ConfigModule.forRoot({ isGlobal: true }),
    UsersModule,
    DatabaseModule,
    OrdersModule,
    OrderItemsModule,
    AlcoholModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
class AppModule {}

module.exports = { AppModule };

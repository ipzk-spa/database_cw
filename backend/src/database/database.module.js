const { Module } = require('@nestjs/common');
const { TypeOrmModule } = require('@nestjs/typeorm');

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        type: 'postgres',
        host: process.env.POSTGRES_HOST,
        port: Number(process.env.POSTGRES_PORT),
        database: process.env.POSTGRES_DATABASE,
        username: process.env.POSTGRES_USERNAME,
        password: process.env.POSTGRES_PASSWORD,
        autoLoadEntities: true,
        synchronize: true,
      }),
    }),
  ],
})
class DatabaseModule {}

module.exports = { DatabaseModule };

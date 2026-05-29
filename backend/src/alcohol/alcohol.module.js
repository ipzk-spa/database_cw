const { Module } = require('@nestjs/common');
const { TypeOrmModule } = require('@nestjs/typeorm');
const { AlcoholService } = require('./alcohol.service');
const { AlcoholController } = require('./alcohol.controller');
const { Alcohol } = require('./entities/alcohol.entity');

@Module({
  imports: [TypeOrmModule.forFeature([Alcohol])],
  controllers: [AlcoholController],
  providers: [AlcoholService],
  exports: [AlcoholService],
})
class AlcoholModule {}

module.exports = { AlcoholModule };

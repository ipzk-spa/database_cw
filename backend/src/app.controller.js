const { Controller, Get, Inject } = require('@nestjs/common');
const { AppService } = require('./app.service');

@Controller()
class AppController {
  constructor(@Inject(AppService) appService) {
    this.appService = appService;
  }

  @Get()
  getHello() {
    return this.appService.getHello();
  }
}

module.exports = { AppController };

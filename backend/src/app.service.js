const { Injectable } = require('@nestjs/common');

@Injectable()
class AppService {
  getHello() {
    return '';
  }
}

module.exports = { AppService };

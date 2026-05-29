const { Inject, Injectable, UnauthorizedException } = require('@nestjs/common');
const { JwtService } = require('@nestjs/jwt');
const { UsersService } = require('../users/users.service');

@Injectable()
class AuthService {
  constructor(
    @Inject(UsersService)
    userService,
    @Inject(JwtService)
    jwtService,
  ) {
    this.userService = userService;
    this.jwtService = jwtService;
  }

  async register(input) {
    const result = this.signIn(input);
    return (await result).accessToken;
  }

  async authenticate(input) {
    const user = await this.validateUser(input);

    if (!user) {
      throw new UnauthorizedException();
    }

    return this.signIn(user);
  }

  async validateUser(input) {
    const user = await this.userService.findUserByEmail(input.email);

    if (user) {
      await this.userService.verificationPassword(
        input.password,
        user.password,
      );

      return {
        userId: user.id,
        email: user.email,
      };
    }

    return null;
  }

  async signIn(user) {
    const tokenPayload = {
      sub: user.userId,
      email: user.email,
    };

    const accessToken = await this.jwtService.signAsync(tokenPayload);

    return { accessToken, email: user.email, userId: user.userId };
  }
}

module.exports = { AuthService };

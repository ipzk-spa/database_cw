const {
  Inject,
  Injectable,
  UnauthorizedException,
} = require('@nestjs/common');
const { JwtService } = require('@nestjs/jwt');

@Injectable()
class AuthGuard {
  constructor(@Inject(JwtService) jwtService) {
    this.jwtService = jwtService;
  }

  async canActivate(context) {
    const request = context.switchToHttp().getRequest();
    const authorization = request.headers.authorization;
    const token = authorization?.split(' ')[1];

    if (!token) {
      throw new UnauthorizedException('Not valid token.');
    }

    try {
      const tokenPayload = await this.jwtService.verifyAsync(token);

      request.user = {
        userId: tokenPayload.sub,
        email: tokenPayload.email,
      };

      return true;
    } catch (error) {
      throw new UnauthorizedException('');
    }
  }
}

module.exports = { AuthGuard };

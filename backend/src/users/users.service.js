const {
  BadRequestException,
  ConflictException,
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} = require('@nestjs/common');
const { InjectRepository } = require('@nestjs/typeorm');
const { JwtService } = require('@nestjs/jwt');
const bcrypt = require('bcrypt');
const { User } = require('./entities/user.entity');

@Injectable()
class UsersService {
  constructor(
    @InjectRepository(User)
    userRepository,
    @Inject(JwtService)
    jwtService,
  ) {
    this.userRepository = userRepository;
    this.jwtService = jwtService;
  }

  async create(createUserDto) {
    const user = await this.findUserByEmail(createUserDto.email);

    if (user) {
      throw new ConflictException('User with email already.');
    }

    const hashedPassword = await this.hashingPassword(createUserDto.password);

    const createUser = this.userRepository.create({
      ...createUserDto,
      password: hashedPassword,
    });

    const savedUser = await this.userRepository.save(createUser);

    const accessToken = await this.jwtService.signAsync({
      sub: savedUser.id,
      email: savedUser.email,
    });

    const { password: _pwd, ...safeUser } = savedUser;
    return { ...safeUser, accessToken };
  }

  sanitizeUser(user) {
    if (!user) return user;
    const { password, ...safe } = user;
    return safe;
  }

  async findAll() {
    const users = await this.userRepository.find({ relations: ['orders'] });
    return users.map((u) => this.sanitizeUser(u));
  }

  async findOne(id) {
    try {
      return await this.userRepository.findOneOrFail({
        where: { id },
        relations: { orders: true },
      });
    } catch (error) {
      throw new NotFoundException('User not found by id.');
    }
  }

  async findOneSafe(id) {
    const user = await this.findOne(id);
    return this.sanitizeUser(user);
  }

  async findUserByEmail(email) {
    return this.userRepository.findOne({ where: { email } });
  }

  async update(id, updateUserDto) {
    if (updateUserDto.password) {
      throw new BadRequestException('An extra password field has been added.');
    }

    await this.findOne(id);

    try {
      await this.userRepository.update(id, updateUserDto);
      return await this.findOneSafe(id);
    } catch (error) {
      throw new BadRequestException('Added extra fields.');
    }
  }

  async updatePassword(id, updatePasswordUserDto) {
    const user = await this.findOne(id);
    const password = updatePasswordUserDto;

    await this.verificationPassword(password.oldPassword, user.password);

    if (password.newPassword !== password.confirmPassword) {
      throw new BadRequestException('Password do not match.');
    }

    try {
      const hashingPassword = await this.hashingPassword(password.newPassword);
      await this.userRepository.update(id, { password: hashingPassword });
      return await this.findOneSafe(id);
    } catch (error) {
      throw new BadRequestException('Added extra fields.');
    }
  }

  async remove(id) {
    return await this.userRepository.delete(id);
  }

  async hashingPassword(password) {
    const salt = 10;
    return await bcrypt.hash(password, salt);
  }

  async verificationPassword(password, hashedPassword) {
    const checkingPassword = await bcrypt.compare(password, hashedPassword);

    if (!checkingPassword) {
      throw new UnauthorizedException('Incorrect password.');
    }
  }
}

module.exports = { UsersService };

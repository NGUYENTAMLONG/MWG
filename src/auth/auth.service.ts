import { BadRequestException, Injectable } from '@nestjs/common';
import { UserEntity } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { loginResponseDto } from './dtos/login-response.dto';
import { JwtPayload } from './payloads/jwt-payload';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
  ) {}
  async validateUserByUsername(
    username: string,
    password: string,
  ): Promise<UserEntity> {
    const user = await this.userService.findOneByUsername(username);
    if (!user) {
      throw new BadRequestException('User not found, disabled or locked');
    }
    return this.compareAccount(password, user);
  }

  async validateUserByEmail(
    email: string,
    password: string,
  ): Promise<UserEntity> {
    const user = await this.userService.findOneByEmail(email);
    if (!user) {
      throw new BadRequestException('User not found, disabled or locked');
    }
    return this.compareAccount(user.password, user);
  }

  async compareAccount(
    password: string,
    user: UserEntity,
  ): Promise<UserEntity | null> {
    const comparePassword = await bcrypt.compare(password, user.password);

    if (comparePassword) {
      return user;
    }
    return null;
  }

  async login(user: UserEntity): Promise<loginResponseDto> {
    const payload: JwtPayload = {
      sub: user.id,
      email: user.email,
      isAdministrator: user.isSuperAdmin,
    };

    return {
      accessToken: this.jwtService.sign(payload),
    };
  }

  private encode(user: UserEntity) {
    const access_token = this.generateToken(user);

    return {
      access_token,
      id: user.id,
      email: user.email,
    };
  }

  private generateToken(user: UserEntity) {
    const payload: JwtPayload = {
      sub: user.id,
      email: user.email,
      isAdministrator: user.isSuperAdmin,
    };
    return this.jwtService.sign(payload, {
      expiresIn: process.env.TOKEN_EXPIRED_IN,
    });
  }

  public decode(token: string) {
    try {
      const jwt = token.replace('Bearer ', '');
      return this.jwtService.decode(jwt, { json: true }) as JwtPayload;
    } catch (e) {
      return null;
    }
  }
}

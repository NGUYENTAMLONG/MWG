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
  async validateUser(username: string, password: string): Promise<UserEntity> {
    const user = await this.userService.findOneByUsername(username);
    if (!user) {
      throw new BadRequestException('User not found, disabled or locked');
    }
    const comparePassword = await bcrypt.compare(password, user.password);

    if (user && comparePassword) {
      return user;
    }
    return null;
  }

  async login(user: UserEntity): Promise<loginResponseDto> {
    const payload: JwtPayload = {
      sub: user.id,
      email: user.email,
    };

    return {
      accessToken: this.jwtService.sign(payload),
    };
  }
}

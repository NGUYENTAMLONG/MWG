import { BadRequestException, Injectable } from '@nestjs/common';
import { UserEntity } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UsersService) {}
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
}

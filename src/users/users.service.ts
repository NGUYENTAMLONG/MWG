import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { uuid } from 'uuidv4';
import { CreateUserDto } from './dtos/create-user.dto';
import { UserEntity } from './entities/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async getUserList(): Promise<UserEntity[]> {
    return await this.userRepository.find();
  }

  async createUser(payload: CreateUserDto): Promise<UserEntity> {
    try {
      const saltOrRounds = 10;
      const hashedPassword = await bcrypt.hash(payload.password, saltOrRounds);
      const newUser = {
        ...payload,
        uId: 'uId-' + uuid(),
        password: hashedPassword,
      };
      const savedUser = await this.userRepository.save(newUser);
      return savedUser;
    } catch (error) {
      return error;
    }
  }
}

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { uuid } from 'uuidv4';
import { CreateUserDto } from './dtos/create-user.dto';
import { UserEntity } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import { ProfileEntity } from './entities/profile.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    @InjectRepository(ProfileEntity)
    private readonly profileRepository: Repository<ProfileEntity>,
  ) {}

  getUserList(): Promise<UserEntity[]> {
    return this.userRepository.find();
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
      await this.profileRepository.save({
        user: savedUser,
      });
      return savedUser;
    } catch (error) {
      return error;
    }
  }

  async createProfile(payload) {}

  async uploadAvatar(payload) {}

  async findOneById(userId: number): Promise<UserEntity> {
    return await this.userRepository.findOne({
      where: { id: userId },
    });
  }

  async findOneByUsername(username: string): Promise<UserEntity> {
    return await this.userRepository.findOne({
      where: { username: username },
    });
  }
}

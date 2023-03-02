import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { uuid } from 'uuidv4';
import { CreateUserDto } from './dtos/create-user.dto';
import { UserEntity } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import { ProfileEntity } from './entities/profile.entity';
import { IAvatar } from './interfaces/avatar.interface';
import { USER_SWAGGER_RESPONSE } from './users.constant';
import { UserRepository } from './user.repository';
import { QueryParamDto } from './dtos/query-param.dto';
import { ProfileRepository } from './profile.repository';

@Injectable()
export class UsersService {
  constructor(
    // @InjectRepository(UserEntity)
    // private readonly userRepository: Repository<UserEntity>,
    // @InjectRepository(ProfileEntity)
    // private readonly profileRepository: Repository<ProfileEntity>,
    private readonly userRepository: UserRepository,
    private readonly profileRepository: ProfileRepository,
  ) {}

  getUserList(query: QueryParamDto): Promise<any> {
    let condition = {};
    if (query.search) {
      condition = [
        { username: Like(`%${query.search}%`) },
        { email: Like(`%${query.search}%`) },
      ];
    }
    return this.userRepository.findAllByConditions(
      condition,
      query,
      {},
      {
        uId: true,
        username: true,
        password: false,
        email: true,
        avatar: false,
      },
    );
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
      console.log(error);
      return error;
    }
  }

  async createProfile(payload) {}

  async uploadAvatar(payload) {}

  async findOneById(userId: number): Promise<UserEntity> {
    return await this.userRepository.findOneByConditions({
      where: { id: userId },
    });
  }

  async findOneByUsername(username: string): Promise<UserEntity> {
    return await this.userRepository.findOneByConditions({
      where: { username: username },
    });
  }
}

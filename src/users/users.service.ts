import { Injectable } from '@nestjs/common';
import { Like, DataSource } from 'typeorm';
import { v4 } from 'uuid';
import { CreateUserDto } from './dtos/create-user.dto';
import { UserEntity } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import { UserRepository } from './user.repository';
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
    private readonly myDataSource: DataSource,
  ) {}

  async getUserList(query): Promise<any> {
    let condition = {};
    console.log(query);
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
      // {
      //   uId: true,
      //   username: true,
      //   password: false,
      //   email: true,
      //   avatar: true,
      // },
    );
  }

  async createUser(payload: CreateUserDto): Promise<UserEntity> {
    //    await this.myDataSource.transaction(async (transactionEntityManager)=>{
    //     await transactionEntityManager.save();
    //     await transactionEntityManager.save();
    // ...
    //    })
    // const queryRunner = await this.myDataSource.createQueryRunner();
    // await queryRunner.connect();

    try {
      const saltOrRounds = 10;
      const hashedPassword = await bcrypt.hash(payload.password, saltOrRounds);
      const newUser = {
        ...payload,
        uId: 'uId-' + v4(),
        password: hashedPassword,
      };
      const savedUser = await this.userRepository.save(newUser);
      await this.profileRepository.save({
        user: savedUser,
      });
      return savedUser;
    } catch (error) {
      // console.log(error);
      return error;
    }
  }
  async createProfile(payload) {}

  async uploadAvatar(payload) {}

  async findOneById(userId: number): Promise<UserEntity> {
    return this.userRepository.findOneByConditions({
      where: { id: userId },
    });
  }

  async findOneByUsername(username: string): Promise<UserEntity> {
    return this.userRepository.findOneByConditions({
      where: { username: username },
    });
  }
  async findOneByEmail(email: string): Promise<UserEntity> {
    return this.userRepository.findOneByConditions({
      where: { email: email },
    });
  }

  public async accessPermission(userId: number): Promise<UserEntity> {
    return this.userRepository.findOne({
      where: { id: userId },
      relations: ['roles', 'roles.permissions'],
    });
  }
}

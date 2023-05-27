import { BadRequestException, Injectable } from '@nestjs/common';
import { Like, DataSource, Repository } from 'typeorm';
import { v4 } from 'uuid';
import { CreateUserDto } from './dtos/create-user.dto';
import { UserEntity } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import { UserRepository } from './user.repository';
import { ProfileRepository } from './profile.repository';
import { CreateUserTeacherDto } from './dtos/create-teacher-account.dto';
import { EXCEPTION_USER } from './constants/user.constant';
import { TeacherRepository } from 'src/teachers/teachers.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { TeacherEntity } from 'src/teachers/enitities/teacher.entity';
import { ProfileEntity } from './entities/profile.entity';
import { CreateProfileDto } from './dtos/create-profile.dto';
import { DEFAULT_SUPERADMIN } from 'src/configs/constants.config';

@Injectable()
export class UsersService {
  constructor(
    // @InjectRepository(UserEntity)
    // private readonly userRepository: Repository<UserEntity>,
    // @InjectRepository(ProfileEntity)
    // private readonly profileRepository: Repository<ProfileEntity>,
    @InjectRepository(TeacherEntity)
    private teachersRepository: Repository<TeacherEntity>,
    private readonly userRepository: UserRepository,
    private readonly profileRepository: ProfileRepository,
    private readonly dataSource: DataSource,
  ) {}

  async onModuleInit() {
    try {
      const foundExisted = await this.userRepository.findExistedRecord();
      const saltOrRounds = 10;
      const hashedPassword = await bcrypt.hash(
        DEFAULT_SUPERADMIN.password,
        saltOrRounds,
      );
      if (foundExisted.length !== 0) return;
      const initAdmin = await this.userRepository.create({
        uId: 'uId-' + v4(),
        email: DEFAULT_SUPERADMIN.email,
        username: DEFAULT_SUPERADMIN.username,
        password: hashedPassword,
        createdByUserId: DEFAULT_SUPERADMIN.createBy,
        isSuperAdmin: true,
      });
      await this.userRepository.save(initAdmin);
      console.log('INIT SUPERADMIN ACCOUNT SUCCESSFULL !!!');
    } catch (error) {
      console.log('Error: ', error);
    }
  }

  async getUserList(query): Promise<any> {
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
      {
        profile: true,
      },
      // {
      //   uId: true,
      //   username: true,
      //   password: false,
      //   email: true,
      //   avatar: true,
      // },
    );
  }

  async getUserWithCreater(userId: number): Promise<any> {
    const foundUser = await this.userRepository.findOne({
      where: {
        id: userId,
      },
    });
    if (!foundUser)
      throw new BadRequestException(EXCEPTION_USER.USER_NOT_FOUND);
    const foundCreater = await this.userRepository.findOne({
      where: {
        id: Number(foundUser.createdByUserId),
      },
    });
    foundUser['createdByUser'] = foundCreater;
    return foundUser;
  }
  async createUser(
    userInRequest: UserEntity,
    payload: CreateUserDto,
  ): Promise<UserEntity> {
    //    await this.myDataSource.transaction(async (transactionEntityManager)=>{
    //     await transactionEntityManager.save();
    //     await transactionEntityManager.save();
    // ...
    //    })
    // const queryRunner = await this.myDataSource.createQueryRunner();
    // await queryRunner.connect();

    try {
      if (payload.confirmPassword !== payload.password) {
        throw new BadRequestException(EXCEPTION_USER.PASSWORD_DOES_NOT_MATCH);
      }
      const saltOrRounds = 10;
      const hashedPassword = await bcrypt.hash(payload.password, saltOrRounds);
      const newUser = {
        ...payload,
        uId: 'uId-' + v4(),
        password: hashedPassword,
        createdByUserId: userInRequest.id,
      };
      const savedUser = await this.userRepository.save(newUser);
      return savedUser;
    } catch (error) {
      console.log(error);
      return error;
    }
  }
  async createUserTeacher(
    userInRequest: UserEntity,
    payload: CreateUserTeacherDto,
  ): Promise<any> {
    const {
      username,
      email,
      password,
      name,
      title,
      expertise,
      achievements,
      metadataTeacher,
      metadataUser,
    } = payload;
    // create a new query runner
    const queryRunner = this.dataSource.createQueryRunner();

    // establish real database connection using our new query runner
    await queryRunner.connect();

    // lets now open a new transaction:
    await queryRunner.startTransaction();
    try {
      const saltOrRounds = 10;
      const hashedPassword = await bcrypt.hash(password, saltOrRounds);
      const newUser = {
        uId: 'uId-' + v4(),
        username,
        email,
        metadata: metadataUser,
        password: hashedPassword,
        createdByUserId: userInRequest.id.toString(),
      };
      const savedUser = await this.userRepository.save(newUser);

      const newTeacher = {
        tId: 'tId-' + v4(),
        name,
        title,
        expertise,
        achievements,
        metadata: metadataTeacher,
        user: savedUser,
        createdByUserId: userInRequest.id.toString(),
      };
      // await this.teachersRepository.save(newTeacher);
      await queryRunner.manager.save(TeacherEntity, newTeacher);
      // commit transaction now:
      await queryRunner.commitTransaction();
      return savedUser;
    } catch (error) {
      console.log({ rollback: true, error });
      // since we have errors let's rollback changes we made
      await queryRunner.rollbackTransaction();
    } finally {
      // you need to release query runner which is manually created:
      await queryRunner.release();
    }
  }
  async createProfile(
    userInRequest: UserEntity,
    payload: CreateProfileDto,
  ): Promise<ProfileEntity> {
    try {
      const foundUser = await this.userRepository.findOne({
        where: {
          id: payload.userId,
        },
      });
      if (!foundUser) {
        throw new BadRequestException(EXCEPTION_USER.USER_NOT_FOUND);
      }
      const newProfile = await this.profileRepository.create({
        ...payload,
        prId: 'prId-' + v4(),
        user: foundUser,
        createdByUserId: userInRequest.id.toString(),
      });
      const savedProfile = await this.profileRepository.save(newProfile);

      //update user relation profile
      await this.userRepository.update(payload.userId, {
        profile: newProfile,
        lastModifiedByUserId: userInRequest.id,
      });
      return savedProfile;
    } catch (error) {
      console.log(error);
      return error;
    }
  }

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

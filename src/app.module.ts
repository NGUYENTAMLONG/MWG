import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import config from 'mysql.config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { WordEntity } from './words/entities/word.entity';
// import config from './database/configs/mysql.config';
import { WordsModule } from './words/words.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { UserEntity } from './users/entities/user.entity';
import { ProfileEntity } from './users/entities/profile.entity';
import { MongooseModule } from '@nestjs/mongoose';
import { RolesModule } from './roles/roles.module';
import { RoleEntity } from './roles/entities/role.entity';
import { PermissionsModule } from './permissions/permissions.module';
import { PermissionEntity } from './permissions/entities/permission.entity';
@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '../..', 'src/assets'),
    }),
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'mwg',
      entities: [
        WordEntity,
        UserEntity,
        ProfileEntity,
        RoleEntity,
        PermissionEntity,
      ],
      synchronize: true,
    }),
    MongooseModule.forRoot(
      'mongodb+srv://tamlong12032000:PziKHF2heASbu7Xd@cluster0.7o9ulpa.mongodb.net/?retryWrites=true&w=majority',
    ),
    WordsModule,
    AuthModule,
    UsersModule,
    RolesModule,
    PermissionsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
// PziKHF2heASbu7Xd;

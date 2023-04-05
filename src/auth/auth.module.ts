import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from 'src/users/users.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JWT_CONFIG } from './configs/auth.config';

@Module({
  imports: [
    JwtModule.register({
      secret: JWT_CONFIG.SECRET,
      signOptions: {
        expiresIn: JWT_CONFIG.EXPIRED_IN,
      },
    }),
    UsersModule,
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}

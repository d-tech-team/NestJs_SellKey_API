import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from 'src/users/users.module';
import { JwtModule, JwtService } from '@nestjs/jwt';
import * as env  from 'dotenv';
env.config();

@Module({
  imports: [
    UsersModule,
    JwtModule.register({ global: true, secret: process.env.JWT_SECRECT }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtService],
})
export class AuthModule {}
 
import {
  BadRequestException,
  HttpException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import * as md5 from 'md5';
import { Sequelize } from 'sequelize-typescript';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private sequelize: Sequelize
  ) { }

  async signup(username: string, password: string) {
    try {
      let user = await this.usersService.findByUsername(username);
      if (user) {
        throw new BadRequestException('Tài khoản đã tồn tại');
      }
      const hashPassword = md5(password);

      await this.sequelize.transaction(async (t) => {
        const transactionHost = { transaction: t };
        await this.usersService.create({
          email: username,
          password: hashPassword,
        });
      })

      return {
        success: true,
        data: 'Đăng ký thành công'
      }
    } catch (error) {
      throw new HttpException({
        success: false,
        data: error.message
      }, error?.statusCode || 500)
    }

  }

  async signin(username: string, password: string) {
    let user = await this.usersService.findByUsername(username);
    if (!user) {
      throw new BadRequestException('Tài khoản không tồn tại');
    }

    if(user.password !== md5(password)) {
      throw new UnauthorizedException('Mật khẩu không chính xác');
    }

    // const isMatch = await bcrypt.compare(password, user.password);
    // if (!isMatch) {
    //   throw new UnauthorizedException('Mật khẩu không chính xác');
    // }

    const accessToken = this.jwtService.sign(
      { id: user.id, username: user.email, role: user.role },
      { expiresIn: '1m', secret: process.env.JWT_SECRECT },
    );
    const refreshToken = this.jwtService.sign(
      { username: user.username },

      { expiresIn: '7d', secret: process.env.JWT_SECRECT },
    );

    delete user.password;

    return {
      ...user,
      token: accessToken,
      refreshToken: refreshToken,
    };
  }
}

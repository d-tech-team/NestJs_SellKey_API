import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async signup(username: string, password: string) {
    let user = await this.usersService.findByUsername(username);
    if (user) {
      throw new BadRequestException('Tài khoản đã tồn tại');
    }
    const hashPassword = await bcrypt.hash(password, 10);
    return this.usersService.create({
      email: username,
      password: hashPassword,
    });
  }

  async signin(username: string, password: string) {
    let user = await this.usersService.findByUsername(username);
    if (!user) {
      throw new BadRequestException('Tài khoản không tồn tại');
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new UnauthorizedException('Mật khẩu không chính xác');
    }

    const accessToken = this.jwtService.sign(
      { id: user.id, username: user.email, role: user.role },
      { expiresIn: '1m', secret: process.env.JWT_SECRECT },
    );
    const refreshToken = this.jwtService.sign(
      { username: user.username },

      { expiresIn: '7d', secret: process.env.JWT_SECRECT },
    );

    return {
      token: accessToken,
      refreshToken: refreshToken,
    };
  }
}

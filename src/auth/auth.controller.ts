import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { SignupDTO } from './dtos/signup.dto';
import { AuthService } from './auth.service';
import { SigninDTO } from './dtos/signin.dto';
import { AuthGuard } from './guard/auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  signup(@Body() body: SignupDTO) {
    return this.authService.signup(body.email, body.password);
  }

  @Post('signin')
  signin(@Body() body: SigninDTO) {
    return this.authService.signin(body.email, body.password);
  }

  @UseGuards(AuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}

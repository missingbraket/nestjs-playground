//user.controller.ts
import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('/user')
export class UserController {
  constructor(private readonly userService: UserService ) {} //의존성 주입

  @Get('/main') //service에서 만든 서비스 보여지도록 url과 연동
  async getMainPage() {
    return this.userService.getMainPage();
  }

  @Post('register')
  async register(@Body() body) {
    const email = body?.email;
    const password = body?.password;

    return this.userService.register(email, password);
  }
  }


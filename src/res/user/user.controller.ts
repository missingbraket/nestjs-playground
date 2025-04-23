//user.controller.ts
import { Controller, Get } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('/user')
export class UserController {
  constructor(private readonly userService: UserService ) {} //의존성 주입

  @Get('/main')
  async getMainPage() {
    return this.userService.getMainPage();
  }
}


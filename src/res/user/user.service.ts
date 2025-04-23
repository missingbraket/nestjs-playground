//user.service.ts
import { Injectable  } from "@nestjs/common";

@Injectable()
export class UserService {
    async getMainPage () { //async : 함수가 비동기적 동작
        return 'User Main Page';
    }
}
//user.service.ts
import { BadRequestException, Injectable  } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UserEntity } from 'src/entities/user.entity';
import { Repository } from "typeorm";
import { hash } from 'bcrypt'; //비밀번호 암호화

@Injectable()
export class UserService {
    async getMainPage () { //async : 함수가 비동기적 동작
        return 'User Main Page';
    }
    constructor(
        @InjectRepository(UserEntity) //DB랑 연결 TypeORM이기 때문
        private readonly userRepository: Repository<UserEntity>,
    ) {}

    //회원가입
    async register(email: string, password: string) {

        //중복 가입 방지
        const existedUser = await this.userRepository.findOne({
            where: {
                email: email,
            },
        });

        if (existedUser) {
            throw new BadRequestException('이미 해당 이메일이 존재합니다.');
        }
        
        const hashedPassword = await hash(password, 10); //10은 salt값으로 암호화할 때 필요

        const user = await this.userRepository.save({ //db저장
            email: email,
            password: hashedPassword,
        });

        return user;
    }
}
# 0520


<aside>
💡

1. **Service → Controller → Module** 
2. data-source.ts파일 → package.json
3. app.module에 data-source.ts정보 담기
4. 테이블 설계도 그리기 → typeORM으로 테이블 만들기

   =src폴더 안에 entities폴더>user.entity.ts/article.entity.ts etc등 필요 테이블 파일 생성

1. .env파일 생성해서 환경변수 입력  → ConfigModule 세팅
</aside>

## 회원가입 구현(User)

### Controller에서 사용자가 아이디,비번 입력 = Post

### Service

- UserService는 유저와 관련된 로직 처리하는 클래스
    - 데이터를 가져와야함 → UserEntity
    - **TypeORM**은 DB와 직접 대화 X → **Repository 이용**
        - Repository :  테이블에 접근하는 중간다리 역할하는 객체
            - 테이블의 데이터를 가공하는 역할을 대신해줌

```jsx
@Injectable()
export class UserService {
    
		constructor(    // UserService 안에 userRepository 주입 (DI)
		  @InjectRepository(UserEntity)
		  private readonly userRepository: Repository<UserEntity>,
		) {}
		
		// 회원 가입 함수
		async register(email: string, password: string) {
		  const user = await this.userRepository.save({ email, password });
		  // DB 저장
		  return user;
		}
		
		// 회원 정보 조회 함수
		async findUserByEmail(email: string) {
		  return await this.userRepository.findOneBy({ email });
		}
```

```jsx
//중복 가입 방지
const existedUser = await this.userRepository.findOne({
    where: {
        email: email,
    },
});

if (existedUser) {
    throw new BadRequestException('이미 해당 이메일이 존재합니다.');
}
```

findOne으로 같은 email값이 있으면 existedUser에 값을 넣고, 새로 가입이면 Null값 반환

### Controller

@Post에는 body가 딸려옴(Post메소드 요청하면서 보내는 내용)

- userService.register()함수에 넘겨줌

```jsx
@Post('register')
  async register(@Body() body) {
    const email = body?.email;
    const password = body?.password;

    return this.userService.register(email, password);
  }
```

⇒ 꺼낸 이메일, 비밀번호를 userService의 register() 함수에 전달해서 실제로 회원가입 처리위해 Service로 보내줌

### Module

```jsx
imports: [TypeOrmModule.forFeature([UserEntity])]
```

⇒ forFeature() : UserService가 UserRepository(엔터티)를 쓸 수 있게 해줌

👉  “아~ 이 모듈에서 UserEntity에 대한 Repository 필요하구나?”
👉 그리고 그 Repository를 서비스에서 @InjectRepository()로 주입 가능하게 만들어줌!

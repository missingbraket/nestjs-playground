# 0520
# NestJS 사용자 등록 기능 정리

- 사용자로부터 이메일과 비밀번호를 입력받아 DB에 저장하는 API 구현

## 🔧 사용 기술
- NestJS
- TypeORM
- MySQL
- bcrypt (비밀번호 해싱)

## 🧩 기능 흐름
1. Service -> Controller -> Module
2. Service에서 비밀번호 해싱 및 유효성 검사
   - bcrypt를 사용할 땐 `salt` 값을 꼭 넘겨줘야 함
3. Repository를 통해 DB에 저장
4. Controller에서 `/user/register` 경로로 POST 요청 받음

## ✨ 배운 점
- TypeORM은 DB와 직접 대화 X -> Repository 이용 : 테이블 데이터 가공역할
- bcrypt 해시 함수에 반드시 `data`(비밀번호)와 `salt` 값이 필요하다
- POST 요청 시 반드시 body에 이메일과 비밀번호를 포함해야 한다!!!!!!
- TypeORM의 Entity와 Repository 사용법

## 📝 추가 팁
- Postman에서 API 테스트할 때, POST 요청에 JSON body를 꼭 포함시키기!!!!!!!!
- 환경변수는 `.env` 파일에 관리하고, `ConfigModule`로 불러오기

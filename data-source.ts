//구조랑 의미만 알고 복붙해서 쓰면 됨 ㅎ_ㅎ
import * as path from 'path';
import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv'; //.env사용 위해 추가 (configModule사용이 불가하기때문)

dotenv.config();

// export const dataSource = new DataSource({
//     type: 'mysql', //어떤 DB 사용할건지
//     host: 'localhost', 
//     port: 3306, //mysql기본 포트번호
//     database: 'study423', //터미널에서 생성해준 디비 이름
//     username: 'root',
//     password: '',
//     entities: [ //테이블정보
//         path.join(__dirname, 'src/entities/**/*.entity.ts'),
//         path.join(__dirname, 'dist/entities/**/*.entity.js'),
//     ],
//     synchronize: false, //서버 켤 때 테이블 자동 생성할지 말지
//     logging: true, // typeorm 쿼리가 실행될 때, 터미널에 MySQL쿼리가 어떻게 짜여졌는지 보여줌
// });

export const dataSource = new DataSource({
    type: 'mysql',
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    database: process.env.DB_NAME,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    entities: [
      path.join(__dirname, 'src/entities/**/*.entity.ts'),
      path.join(__dirname, 'dist/entities/**/*.entity.js'),
    ],
    synchronize: false,
    logging: true,
  });
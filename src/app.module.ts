import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as path from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './res/user/user.module';
import { ConfigModule, ConfigService } from '@nestjs/config';

console.log(`.env.${process.env.NODE_ENV}`); //cross-env위해 추가

// NestJS + TypeORM + MySQL 연결 설정
@Module({
  imports: [

    ConfigModule.forRoot({
      envFilePath: `.env.${process.env.NODE_ENV}`, //cross-env위해 추가
      isGlobal: true,
    }), //.env(환경변수) 사용하기 위함

    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      // useFactory: () => ({ //type, host etc를 TypeOrm에 넘겨주란 뜻
      useFactory: (configService: ConfigService) => ({
        //host: 'localhost' -> host: configService.get('DB_HOST')로 변경
        retryAttempts: configService.get('NODE_ENV') === 'prod' ? 10 : 1,
        type: 'mysql',
        host: configService.get('DB_HOST'),
        port: Number(configService.get('DB_PORT')), //3306,
        database: configService.get('DB_NAME'), //'study423',
        username: configService.get('DB_USER'), //'root',
        password: configService.get('DB_PASSWORD'), //'',
        entities: [
          path.join(__dirname, '/entities/**/*.entity.{js,ts}'),
        ],
        synchronize: false,
        logging: true,
        timezone: 'local',
      }),
    }),
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

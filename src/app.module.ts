import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as path from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './res/user/user.module';

// NestJS + TypeORM + MySQL 연결 설정
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: () => ({ //type, host etc를 TypeOrm에 넘겨주란 뜻
        retryAttempts: 10,
        type: 'mysql',
        host: 'localhost',
        port: 3306,
        database: 'study',
        username: 'root',
        password: '',
        entities: [
          path.join(__dirname, '/entities/**/*.entity/{js, ts}'),
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

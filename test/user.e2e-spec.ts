import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus, INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from 'src/models/users/users.module';
import { AuthModule } from 'src/auth/auth.module';
import { AppController } from 'src/app.controller';
import { AppService } from 'src/app.service';
import { SQLiteInMemoryConfig } from 'src/config/database/sqlite3/memory';

describe('회원 기능 (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot(SQLiteInMemoryConfig),
        UsersModule,
        AuthModule
      ],
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  describe("회원 가입", () => {
    it('성공하면 jwt 받기 (success)', () => {
      return request(app.getHttpServer())
        .post('/signUp')
        .send({
          userId: "user01",
          password: "12341234"
        })
        .expect(HttpStatus.CREATED)
        .expect(res => {
          expect(res.body).toHaveProperty('access_token');
        })
    });

    it('이미 존재하는 아이디면 실패 (fail)', () => {
      return request(app.getHttpServer())
        .post('/signUp')
        .send({
          userId: "user01",
          password: "12341234"
        })
        .expect(HttpStatus.CONFLICT)
    });
  })

  describe('로그인', () => {
    it('성공하면 토큰 (success)', () => {
      return request(app.getHttpServer())
        .post('/signIn')
        .send({
          userId: "user01",
          password: "12341234"
        })
        .expect(HttpStatus.OK)
        .expect(res => {
          expect(res.body).toHaveProperty('access_token');
        })
    });

    it('비밀번호 틀리면 실패 (fail)', () => {
      return request(app.getHttpServer())
        .post('/signIn')
        .send({
          userId: "user01",
          password: "00000000"
        })
        .expect(HttpStatus.UNAUTHORIZED)
    })
  })
  
});

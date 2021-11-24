import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SQLiteConfig } from './config/database/sqlite3/configuration';

@Module({
  imports: [TypeOrmModule.forRoot(SQLiteConfig)],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

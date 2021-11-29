import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { SQLiteConfig } from './config/database/sqlite3/configuration';
import { UsersModule } from './models/users/users.module';
import { CarsModule } from './models/cars/cars.module';
import { TiresModule } from './models/tires/tires.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(SQLiteConfig),
    UsersModule,
    AuthModule,
    CarsModule,
    TiresModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TiresRepository } from '../tires/tires.repository';
import { TiresService } from '../tires/tires.service';
import { UsersRepository } from '../users/users.repository';
import { UsersService } from '../users/users.service';
import { CarsController } from './cars.controller';
import { CarsRepository } from './cars.repository';
import { CarsService } from './cars.service';

@Module({
  imports: [
    HttpModule,
    TypeOrmModule.forFeature([
      UsersRepository,
      CarsRepository,
      TiresRepository
    ]),
  ],
  controllers: [CarsController],
  providers: [CarsService, UsersService, TiresService]
})
export class CarsModule {}

import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CarsRepository } from '../cars/cars.repository';
import { TiresController } from './tires.controller';
import { TiresRepository } from './tires.repository';
import { TiresService } from './tires.service';

@Module({
  imports: [
    HttpModule,
    TypeOrmModule.forFeature([
      CarsRepository,
      TiresRepository
    ])
  ],
  controllers: [TiresController],
  providers: [TiresService]
})
export class TiresModule {}

import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { lastValueFrom } from 'rxjs';
import { Car } from '../cars/entities/car.entity';
import { TireSet } from './dto/tireSet.dto';
import { Tire } from './entities/tire.entity';
import { TiresRepository } from './tires.repository';

@Injectable()
export class TiresService {
    constructor(
        private httpService: HttpService,
        private tiresRepository: TiresRepository
    ) {}

    async createTireSet(frontTireStandard, rearTireStandard, car: Car): Promise<void> {
        const frontDto = await this.createTireDto(frontTireStandard, 'F', car);
        const rearDto = await this.createTireDto(rearTireStandard, 'R', car);

        await this.tiresRepository.createOne(frontDto);
        await this.tiresRepository.createOne(rearDto);
    }

    async createTireDto(tireStandard, side: 'F'|'R', car: Car) {
        const standards = await tireStandard.match(/\d{2,3}/g);
        const constructionType = await tireStandard.match(/Z?[RD]/);
        const createTireDto = {
            width: standards[0],
            aspectRatio: standards[1],
            wheelDiameter: standards[2],
            constructionType: constructionType[0],
            side,
            car
        }
        return createTireDto;
    }

    async getTires(trimId) {
        const res = await lastValueFrom(
            this.httpService.get(`https://dev.mycar.cardoc.co.kr/v1/trim/${trimId}`)
        );

        return plainToInstance(TireSet,res.data.spec.driving);
    }
}

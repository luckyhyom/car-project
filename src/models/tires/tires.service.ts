import { Injectable } from '@nestjs/common';
import { Car } from '../cars/entities/car.entity';
import { TireSet } from './dto/tireSet.dto';
import { TiresRepository } from './tires.repository';
import { TireAPI } from './utils/tire-api';

@Injectable()
export class TiresService {
    constructor(private tiresRepository: TiresRepository) {}

    async createTireSet(tireSet: TireSet, car: Car): Promise<void> {
        const frontDto = await this.createTireDto(await tireSet.getFront(), 'F', car);
        const rearDto = await this.createTireDto(await tireSet.getRear(), 'R', car);

        await this.tiresRepository.createOne(frontDto);
        await this.tiresRepository.createOne(rearDto);
    }

    private async createTireDto(tireStandard, side: 'F'|'R', car: Car) {
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
        const tireSet = await TireAPI.get(trimId);

        return await this.isRightFormat(tireSet)
            ? tireSet
            : null;
    }

    private async isRightFormat(tireSet: TireSet) {
        const tireStandardReg = /[1-3][0-9][05]\/[1-9][0-9]Z?[RD][1-2][0-9]/;
        return tireStandardReg.test(tireSet.getFront()) && tireStandardReg.test(tireSet.getRear());
    }
}

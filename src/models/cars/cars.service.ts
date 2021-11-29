import { Injectable } from '@nestjs/common';
import { CreateTrimReq } from 'src/dto/CreateTrimReq.dto';
import { TiresService } from '../tires/tires.service';
import { UsersRepository } from '../users/users.repository';
import { CarsRepository } from './cars.repository';

@Injectable()
export class CarsService {
    constructor(
        private usersRepository: UsersRepository,
        private carsRepository: CarsRepository,
        private tiresService: TiresService
    ) {}

    async enroll(createTrimsReq: CreateTrimReq[]) {
        const result = await this.getMessageForm();
        
        for (const dto of createTrimsReq) {
            const { id, trimId } = dto;
            const { frontTireStandard, rearTireStandard } = await this.tiresService.getTires(trimId);
            
            if(!await this.tiresService.validateTireFormat(frontTireStandard, rearTireStandard)) {
                result.fail.id.push(id);
                continue;
            }
            
            const user = await this.usersRepository.findBy(id);
            const createdCar = await this.carsRepository.createOne({ user, trimId });

            await this.tiresService.createTireSet(frontTireStandard, rearTireStandard, createdCar);
            result.success.id.push(id);
        }

        return result;
    }

    async getMessageForm() {
        return {
            success: {
                id: [],
            },
            fail: {
                id: [],
                message: 'Wrong tire standard format'
            }
        }
    }
}

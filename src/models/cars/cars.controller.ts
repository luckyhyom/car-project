import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { LimitArrayPipe } from 'src/common/pipes/limit-array.pipe';
import { CreateTrimReq } from 'src/dto/CreateTrimReq.dto';
import { CarsService } from './cars.service';

@Controller('cars')
export class CarsController {
    constructor(private carsService: CarsService) {}

    @Post()
    @UseGuards(JwtAuthGuard)
    enrollCarOfUser(
        @Body(new LimitArrayPipe({ items: CreateTrimReq }, 1, 5))
        createTrimsReq :CreateTrimReq[]
    ) {
        return this.carsService.enroll(createTrimsReq);
    }
}

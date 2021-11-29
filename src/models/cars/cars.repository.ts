import { EntityRepository, Repository } from "typeorm";
import { Car } from "./entities/car.entity";

@EntityRepository(Car)
export class CarsRepository extends Repository<Car>{
    async createOne(dto) {
        const {trimId, user} = dto;
        const created = this.create({
            trimId,
            user
        });
        return await this.save(created);
    }
}
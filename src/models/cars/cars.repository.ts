import { createQueryBuilder, EntityRepository, Repository } from "typeorm";
import { User } from "../users/entities/user.entity";
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

    async findUserCars(pk: number) {
        const user = new User();
        user.pk = pk
        return await createQueryBuilder(Car)
            .leftJoinAndSelect("Car.tires", "tire")
            .where("Car.userpk = :user", { user: user.pk })
            .getMany();
    }
}
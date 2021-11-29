import { EntityRepository, Repository } from "typeorm";
import { Tire } from "./entities/tire.entity";

@EntityRepository(Tire)
export class TiresRepository extends Repository<Tire> {
    async createOne(dto) {
        return await this.save(dto);
    }
}
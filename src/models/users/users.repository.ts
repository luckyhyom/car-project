import { EntityRepository, Repository } from "typeorm";
import { SignUp } from "src/auth/dto/signUp.dto";
import { User } from "./entities/user.entity";

@EntityRepository(User)
export class UsersRepository extends Repository<User> {
    async createOne(body: SignUp): Promise<User> {
        return await this.save(body);
    }

    async findBy(userIdOrPk: string|number): Promise<User> {
        return typeof userIdOrPk === "number"
            ? await this.findOne({ pk: userIdOrPk })
            : await this.findOne({ userId: userIdOrPk });
    }
}

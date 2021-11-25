import { EntityRepository, Repository } from "typeorm";
import { SignUp } from "./dto/signUp.dto";
import { User } from "./entities/user.entity";

@EntityRepository(User)
export class UsersRepository extends Repository<User> {
    async createOne(body: SignUp): Promise<User> {
        return await this.save(body);
    }
}

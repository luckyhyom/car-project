import { Injectable } from '@nestjs/common';
import { SignUp } from './dto/signUp.dto';
import { User } from './entities/user.entity';
import { UsersRepository } from './users.repository';

@Injectable()
export class UsersService {
    constructor(private usersRepository: UsersRepository) {}

    async createOne(body: SignUp): Promise<User> {
        return this.usersRepository.create(body);
    }
}

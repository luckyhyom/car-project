import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { SignUp } from '../../auth/dto/signUp.dto';
import { User } from './entities/user.entity';
import { UsersRepository } from './users.repository';

@Injectable()
export class UsersService {
    constructor(private usersRepository: UsersRepository) {}
    
    async createOne(body: SignUp): Promise<User> {
        const user = await this.usersRepository.findBy(body.userId);
        if(user) {
            throw new HttpException('ID already exists.', HttpStatus.CONFLICT);
        }
        return await this.usersRepository.createOne(body);
    }

    async findOne(userIdOrPK: string|number):  Promise<User> {
        return await this.usersRepository.findBy(userIdOrPK);
    }
}

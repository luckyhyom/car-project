import { Body, Controller, Post } from '@nestjs/common';
import { SignUp } from './dto/signUp.dto';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService) {}

    @Post('signUp')
    async signUp(@Body() body: SignUp): Promise<User> {
        return await this.usersService.createOne(body);
    }
}

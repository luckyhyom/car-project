import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/models/users/users.service';
import * as bcrypt from 'bcrypt';
import { SignUp } from './dto/signUp.dto';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './types/jwt-payload.type';
import { CheckedAuthRes } from './types/checked-auth-res.type';
import { AccessToken } from './types/jwt.type';
import { LoggedInUser } from './dto/logged-in-user.dto';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService
    ) {}

    async validateUser(userId: string, password: string): Promise<any> {
        const user = await this.usersService.findOne(userId);
        if(await this.isMatch(password, user?.password)) {
            const { password, ...rest } = user;
            return  rest;
        }
        return null;
    }

    async signUp(body: SignUp): Promise<CheckedAuthRes> {
        const hashed = await this.hash(body.password);
        body.password = hashed;
        const newUser = await this.usersService.createOne(body);
        const { access_token } = await this.makeJWT(newUser.pk);
        return {
            access_token,
            userId: newUser.userId
        };
    }

    async signIn(user: LoggedInUser): Promise<CheckedAuthRes> {
        const { access_token } = await this.makeJWT(user.pk);
        return {
            access_token,
            userId: user.userId
        };
    }

    private async makeJWT(pk: number): Promise<AccessToken> {
        const payload: JwtPayload = { pk };
        return  {
            access_token: this.jwtService.sign(payload)
        }
    }

    private async hash(data: string): Promise<string> {
        const saltOrRounds = 10;
        return await bcrypt.hash(data, saltOrRounds);
    }

    private async isMatch(data: string, hashed: string) {
        return await bcrypt.compare(data, hashed);
    }
}

// local과 똑같은 결과값 LoggedInUser

import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { UsersService } from "src/models/users/users.service";
import { jwtConstants } from "../constants/constants";
import { LoggedInUser } from "../dto/logged-in-user.dto";
import { JwtPayload } from "../types/jwt-payload.type";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        private usersService: UsersService
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: jwtConstants.secret,
        })
    }

    async validate(payload: JwtPayload): Promise<LoggedInUser> {
        const { password, ...rest } = await this.usersService.findOne(payload.pk);
        if(!password) {
            throw new HttpException('Something went wrong.', HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return rest;
    }
}
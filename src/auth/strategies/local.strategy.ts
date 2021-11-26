import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { AuthService } from "src/auth/auth.service";
import { LoggedInUser } from "../dto/logged-in-user.dto";


@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(private authService: AuthService) {
        super({ usernameField: "userId" });
    }

    async validate(userId: string, password: string): Promise<LoggedInUser> {
        const user = await this.authService.validateUser(userId, password);
        if(!user) {
            throw new UnauthorizedException();
        }
        return user;
    }
}
import { Body, Controller, Get, HttpCode, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth/auth.service';
import { LoggedInUser } from './auth/dto/logged-in-user.dto';
import { SignUp } from './auth/dto/signUp.dto';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { LocalAuthGuard } from './auth/guards/local-auth.guard';
import { CheckedAuthRes } from './auth/interfaces/checked-auth-res.interface';
import { UserReq } from './common/decorators/requests/logged-in-user.decorator';

@Controller()
export class AppController {
    constructor(
        private readonly authService: AuthService
    ) {}

    @Post('signUp')
    async signUp(@Body() body: SignUp): Promise<CheckedAuthRes> {
        return await this.authService.signUp(body);
    }

    @UseGuards(LocalAuthGuard)
    @Post('signIn')
    @HttpCode(200)
    async signIn(@UserReq() user: LoggedInUser): Promise<CheckedAuthRes> {
        return await this.authService.signIn(user);
    }
}
import { IsNotEmpty, IsString, Length, Max, Min } from "class-validator";

export class SignUp {
    @IsString()
    @IsNotEmpty()
    @Length(4,20)
    userId: string;

    @IsString()
    @IsNotEmpty()
    @Length(8,20)
    password: string;
}
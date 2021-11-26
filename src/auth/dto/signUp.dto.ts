import { IsNotEmpty, IsString, Max, Min } from "class-validator";

export class SignUp {
    @Min(4)
    @Max(20)
    @IsString()
    @IsNotEmpty()
    userId: string;

    @Min(8)
    @Max(20)
    @IsString()
    @IsNotEmpty()
    password: string;
}
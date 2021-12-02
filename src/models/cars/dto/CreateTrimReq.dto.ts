import { IsNotEmpty, IsString } from "class-validator";

export class CreateTrimReq {
	@IsString()
	@IsNotEmpty()
	id: string;

	@IsString()
	@IsNotEmpty()
	trimId: string;
}
import { Type } from "class-transformer";
import { ArrayMaxSize, IsArray, ValidateNested } from "class-validator";
import { CreateTrimReq } from "./src/models/cars/dto/CreateTrimReq.dto";

export class CreateTrimsReq {
    @IsArray()
    @ValidateNested({ each: true })
    @ArrayMaxSize(2)
    @Type(() => CreateTrimReq)
	createTrims: CreateTrimReq[];
}
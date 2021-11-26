import { OmitType } from "@nestjs/mapped-types";
import { User } from "src/models/users/entities/user.entity";

export class LoggedInUser extends OmitType(User, ['password'] as const) {}
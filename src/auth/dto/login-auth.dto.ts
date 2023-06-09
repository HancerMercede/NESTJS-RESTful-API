/* eslint-disable prettier/prettier */
import { IsEmail, IsStrongPassword, MinLength } from "class-validator";

/* eslint-disable prettier/prettier */
export class LoginAuthDto {
    @IsEmail()
    email: string;

    @IsStrongPassword()
    @MinLength(8)
    password: string;
}
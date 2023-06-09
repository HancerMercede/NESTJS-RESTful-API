/* eslint-disable prettier/prettier */
import { IsEmail, IsStrongPassword, MaxLength, MinLength } from "class-validator";
import { Date } from "mongoose";

/* eslint-disable prettier/prettier */
export class RegisterAuthDto {
    @IsEmail()
    email: string;

    @IsStrongPassword()
    @MinLength(8)
    password: string;

    @MinLength(5)
    @MaxLength(50)
    name: string;

    createAt: Date;
    updateAt: Date;
}
/* eslint-disable prettier/prettier */
import { IsNotEmpty, Length } from "class-validator";

/* eslint-disable prettier/prettier */
export class CreateVideoDto {

    @IsNotEmpty()
    @Length(1, 100)
    title: string;

    @IsNotEmpty()
    @Length(10, 100)
    description: string;

    @IsNotEmpty()
    idCourse: string;

    source: string;

    score: number;
}

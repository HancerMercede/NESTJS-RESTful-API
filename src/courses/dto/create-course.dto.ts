/* eslint-disable prettier/prettier */
import { ApiProperty, refs } from "@nestjs/swagger";
import { IsNotEmpty, IsUrl, Length, IsUUID } from "class-validator";
import { User } from "src/users/model/user.schema";


/* eslint-disable prettier/prettier */
export class CreateCourseDto {
    @ApiProperty()
    @IsNotEmpty()
    title: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsUUID()
    idAuthor: string;

    @ApiProperty()
    @IsNotEmpty()
    price: number;

    @ApiProperty()
    @IsNotEmpty()
    @Length(1, 100)
    description: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsUrl()
    cover: string;
}

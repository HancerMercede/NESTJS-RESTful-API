/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

export type CourseDocument = HydratedDocument<Course>;

@Schema()
export class Course {

    @Prop({ unique: true, default: uuidv4 })
    id: string;

    @Prop()
    title: string;

    @Prop({ required: true })
    idAuthor: string;

    @Prop()
    price: number;

    @Prop()
    description: string;

    @Prop()
    cover: string;
}

export const CourseSchema = SchemaFactory.createForClass(Course);

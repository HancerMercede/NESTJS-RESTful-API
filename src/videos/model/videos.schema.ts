/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

export type VideoDocument = HydratedDocument<Video>;

@Schema()
export class Video {
    @Prop({ unique: true, default: uuidv4 })
    id: string;

    @Prop()
    title: string;

    @Prop()
    idCourse: string;

    @Prop()
    description: string;

    @Prop({ default: null })
    source: string;

    @Prop({ default: 0 })
    score: number;

}

export const VideoSchema = SchemaFactory.createForClass(Video);
/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
    @Prop({ unique: true, default: uuidv4 })
    id: string;

    @Prop({ require: true, unique: true })
    email: string;

    @Prop()
    password: string;

    @Prop({ require: true })
    name: string;

    @Prop()
    avatar: string;

    @Prop()
    description: string;

    @Prop({ required: true, default: ['user'] })
    roles: string[];
}

export const UserSchema = SchemaFactory.createForClass(User);
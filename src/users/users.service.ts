/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/ban-types */
import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './model/user.schema';

interface ModelExt<T> extends Model<T> {
  delete: Function;
  findAllCourses: Function;
}

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: ModelExt<UserDocument>) { }

  async create(createUserDto: CreateUserDto) {
    return await this.userModel.create(createUserDto);
  }

  findAll() {
    return this.userModel.find();
  }

  findOne(id: string) {
    return this.userModel.findOne({ id: id });
  }
  update(id: string, updateUserDto: UpdateUserDto) {
    return this.userModel.findOneAndUpdate({ id: id }, updateUserDto, {
      upsert: true,
      new: true,
    });
  }

  remove(id: string) {
    return this.userModel.delete({ id: id });
  }
}

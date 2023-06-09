/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { Injectable, Options } from '@nestjs/common';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Course, CourseDocument } from './model/courses.schema';
import { Model } from 'mongoose';


interface ModelExt<T> extends Model<T> {
  delete: Function;
  paginate: Function;
  findAllCourses: Function;
}

@Injectable()
export class CoursesService {

  constructor(@InjectModel(Course.name) private courseModel: ModelExt<CourseDocument>) { }

  async create(createCourseDto: CreateCourseDto) {
    return await this.courseModel.create(createCourseDto);
  }

  async findAll(page: string, limit: string) {

    const options = {
      page: page, limit: limit,
    }

    return await this.courseModel.paginate({ deleted: false }, options);
  }

  async findOne(id: string) {
    return await this.courseModel.findOne({ id: id })
  }

  async update(id: string, updateCourseDto: UpdateCourseDto) {
    return await this.courseModel.findOneAndUpdate({ id: id }, updateCourseDto, {
      upsert: true,
      new: true,
    });
  }

  async remove(id: string) {
    return await this.courseModel.delete({ id: id });
  }
}
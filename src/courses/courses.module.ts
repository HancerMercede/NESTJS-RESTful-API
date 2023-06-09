/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { CoursesService } from './courses.service';
import { CoursesController } from './courses.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Course, CourseSchema } from './model/courses.schema';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: Course.name,
        useFactory: () => {
          const schema = CourseSchema;
          schema.plugin(require('mongoose-paginate-v2'));
          return schema;
        }
      }
    ]),
  ],
  controllers: [CoursesController],
  providers: [CoursesService]
})
export class CoursesModule { }

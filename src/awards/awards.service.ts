/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { CreateAwardDto } from './dto/create-award.dto';
import { UpdateAwardDto } from './dto/update-award.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Awards, AwardsDocument } from './model/awards.schema';
import { Model } from 'mongoose';

interface ModelExt<T> extends Model<T> {
  delete: Function;
  paginate: Function;
  findAllCourses: Function;
}


@Injectable()
export class AwardsService {

  constructor(@InjectModel(Awards.name) private awardsModel: ModelExt<AwardsDocument>) { }

  create(createAwardDto: CreateAwardDto) {
    return this.awardsModel.create(createAwardDto);
  }

  findAll() {
    return this.awardsModel.find();
  }

  findOne(id: string) {
    return this.awardsModel.findOne({ id: id })
  }

  update(id: number, updateAwardDto: UpdateAwardDto) {
    return this.awardsModel.findOneAndUpdate({ id: id }, updateAwardDto, {
      upsert: true,
      new: true,
    })
  }

  remove(id: string) {
    return this.awardsModel.delete({ id: id })
  }
}

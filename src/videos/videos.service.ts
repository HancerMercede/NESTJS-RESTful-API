/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@nestjs/common';
import { CreateVideoDto } from './dto/create-video.dto';
import { UpdateVideoDto } from './dto/update-video.dto';
import { Multer } from 'multer';
import { Video, VideoDocument } from './model/videos.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

interface ModelExt<T> extends Model<T> {
  delete: Function;
  findAllCourses: Function;
}

@Injectable()
export class VideosService {
  constructor(@InjectModel(Video.name) private VideoModel: ModelExt<VideoDocument>) { }

  async create(createVideoDto: CreateVideoDto) {
    return await this.VideoModel.create(createVideoDto);
  }

  async addVideo(id: string, filename: string) {
    return await this.VideoModel.findOneAndUpdate({ id: id, source: filename });
  }

  async findAll(id: string, desc: string) {
    return await this.VideoModel.findOne({ id: id })
  }

  async findOne(id: string) {
    return await this.VideoModel.findOne({ id: id })
  }

  async update(id: string, _updateVideoDto: UpdateVideoDto) {
    return await this.VideoModel.findOneAndUpdate({ id: id }, _updateVideoDto, {
      upsert: true,
      new: true,
    });
  }

  async remove(id: string) {
    return await this.VideoModel.findOneAndDelete({ id: id })
  }
}

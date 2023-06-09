/* eslint-disable prettier/prettier */
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  HttpException,
  HttpStatus,
  UseInterceptors,
  UploadedFile
} from '@nestjs/common';
import { VideosService } from './videos.service';
import { CreateVideoDto } from './dto/create-video.dto';
import { UpdateVideoDto } from './dto/update-video.dto';
import { ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { storage } from 'src/utils/media.handle';

@ApiTags('videos')
@Controller('videos')
export class VideosController {
  constructor(private readonly videosService: VideosService) { }

  @Post()
  create(@Body() createVideoDto: CreateVideoDto) {
    console.log(createVideoDto);
    return this.videosService.create(createVideoDto);
  }

  @Post('upload/:id')
  @UseInterceptors(FileInterceptor('file', { storage }))
  uploadFile(@Param('id') id: string, @UploadedFile() file: Express.Multer.File) {
    return this.videosService.addVideo(id, file.filename);
  }

  @Get()
  findAll(@Query('id') id: string, @Query('desc') desc: string) {
    console.log(id);
    console.log(desc);

    if (id === null) {
      throw new HttpException('NotFound', HttpStatus.NOT_FOUND);
    }
    return this.videosService.findAll(id, desc);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.videosService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateVideoDto: UpdateVideoDto) {
    return this.videosService.update(id, updateVideoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.videosService.remove(id);
  }
}

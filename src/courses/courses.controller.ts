/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, Param, Delete, HttpCode, UseGuards, Req, Put } from '@nestjs/common';
import { CoursesService } from './courses.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { BrowserAgentGuard } from 'src/guards/browser-agent/browser-agent.guard';
import { JwtGuardGuard } from 'src/guards/jwt-guard/jwt-guard.guard';
import { Request } from 'express';
import { RolesGuardGuard } from 'src/guards/roles-guard/roles-guard.guard';


@ApiTags('courses')
@Controller('courses')
@UseGuards(BrowserAgentGuard, JwtGuardGuard, RolesGuardGuard)
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) { }

  @ApiBearerAuth()
  @Post()
  @HttpCode(201)
  async create(@Req() req: Request, @Body() createCourseDto: CreateCourseDto) {
    console.log('User making the action: ', req.user);
    return await this.coursesService.create(createCourseDto);
  }
  @Get()
  @HttpCode(200)
  async findAll(@Req() req: Request) {

    const { page, limit } = req.query

    const pagex = page == undefined ? 1 : page
    const limitx = limit == undefined ? 10 : limit

    return await this.coursesService.findAll(pagex.toString(), limitx.toString());
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.coursesService.findOne(id);
  }

  @ApiBearerAuth()
  @Put(':id')
  async update(@Param('id') id: string, @Body() updateCourseDto: UpdateCourseDto) {
    return await this.coursesService.update(id, updateCourseDto);
  }

  @ApiBearerAuth()
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.coursesService.remove(id);
  }

}
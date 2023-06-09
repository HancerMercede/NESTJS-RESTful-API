/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AwardsService } from './awards.service';
import { AwardsController } from './awards.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Awards, AwardsSchema } from './model/awards.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Awards.name, schema: AwardsSchema }
    ])
  ],
  controllers: [AwardsController],
  providers: [AwardsService],
})
export class AwardsModule { }

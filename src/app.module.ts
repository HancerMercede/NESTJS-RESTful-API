/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { CoursesModule } from './courses/courses.module';
import { AuthModule } from './auth/auth.module';
import { VideosModule } from './videos/videos.module';
import { MarketModule } from './market/market.module';
import { ConfigModule } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { AwardsModule } from './awards/awards.module';
import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { EventMailModule } from './event-mail/event-mail.module';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { MailModule } from './mail/mail.module';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'client'),
    }),
    EventEmitterModule.forRoot(),
    MongooseModule.forRoot(process.env.DB_URI, {
      connectionFactory: (connection) => {
        connection.plugin(require('mongoose-delete'), { overrideMothods: 'all' });
        return connection;
      }
    }),
    CoursesModule,
    AuthModule,
    VideosModule,
    MarketModule,
    AwardsModule,
    UsersModule,
    EventMailModule,
    MailModule,
  ],
  controllers: [],
  providers: [AppService],
})
export class AppModule { }

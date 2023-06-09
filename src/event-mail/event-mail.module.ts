/* eslint-disable prettier/prettier */
import { MailerService } from '@nestjs-modules/mailer';
import { Module } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { UserDocument } from 'src/users/model/user.schema';


@Module({})
export class EventMailModule {

    constructor(private readonly mailService: MailerService) { }
    @OnEvent('user.login')
    handleUserLoginEvent(user: UserDocument) {
        console.log('User Login: ', user);
        // handle and process "OrderCreatedEvent" event
    }

    @OnEvent('user.created')
    handleUserCreatedEvent(user: UserDocument) {
        this.mailService.sendMail({
            to: user.email,
            subject: 'Welcome, to this great platform.',
            template: 'welcome',
            context: {
                name: user.name
            }
        })
        console.log('User Register: ', user);
        // handle and process "OrderCreatedEvent" event
    }

}

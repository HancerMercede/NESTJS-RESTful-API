/* eslint-disable prettier/prettier */
import { MailerModule } from '@nestjs-modules/mailer';
import { Module } from '@nestjs/common';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';

@Module({
    imports: [
        MailerModule.forRootAsync({
            useFactory: () => {
                console.log('host:', process.env.HOST);
                return {
                    transport: {
                        host: process.env.HOST,
                        secure: process.env.MAIL_SECURE === 'true',
                        port: 2525,
                        auth: {
                            user: process.env.MAIL_USER,
                            pass: process.env.MAIL_PASSWORD,
                        }

                    },
                    defaults: {
                        from: `"nest-modules" ${process.env.MAIL_FROM}`,
                    },
                    template: {
                        dir: __dirname + '/templates',
                        adapter: new HandlebarsAdapter(),
                        options: {
                            strict: true,
                        },
                    },
                }
            },
        }),

    ]
})
export class MailModule { }

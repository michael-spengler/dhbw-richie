import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import nodemailer from 'nodemailer';
import { Data } from './entities/data.entity';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/test')
  public async getTest(): Promise<Data[]> {
    console.log('test');
    let transporter = nodemailer.createTransport({
      host: 'smtp.office365.com', // Office 365 server
        port: 587,     // secure SMTP
        secure: false, // false for TLS - as a boolean not string - but the default is false so just remove this completely
        auth: {
            user: '***',
            pass: '***'
        },
        tls: {
            ciphers: 'SSLv3'
        }
    });
    let info = await transporter.sendMail({
      from: '"DHWB Richie" <TODO@TODO.TODO>', // sender address (sender same as login)
      to: 'TODO user.email', // list of receivers
      subject: 'Hello ✔', // Subject line
      text: 'Hello world?', // plain text body
      html: '<b>Hello world?</b>', // html body
    });

    console.log('Message sent: %s', info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>


    return this.appService.getTest();
  }
}

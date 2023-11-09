import { Injectable } from '@nestjs/common';
import { CreateMailDto } from './dto/create-mail.dto';
import { UpdateMailDto } from './dto/update-mail.dto';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailsService {
  private transporter: any;

  constructor() {
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'bienestarytalento@continental.edu.pe',
        pass: 'sprl dcmp prhv yhlu',
      },
      tls: {
        rejectUnauthorized: false, // Desactiva la verificación del certificado
      },
    });
  }

  async enviarCorreo(
    destinatario: string,
    asunto: string,
    mensaje: string,
  ): Promise<void> {
    const mailOptions = {
      from: 'bienestarytalento@continental.edu.pe',
      to: destinatario,
      subject: asunto,
      html: mensaje,
    };

    return await this.transporter.sendMail(mailOptions);
  }
}

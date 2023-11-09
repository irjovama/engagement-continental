import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { MailsService } from './mails.service';

@Controller('mails')
export class MailsController {
  constructor(private readonly mailsService: MailsService) {}

  @Post()
  enviarCorreoEjemplo(@Body('email') destinatario: string) {
    const asunto = 'Asunto del correo';
    const mensaje = 'Contenido del mensaje';

    return this.mailsService.enviarCorreo(destinatario, asunto, mensaje);
  }
}

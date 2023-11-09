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
  enviarCorreoEjemplo(
    @Body('email') destinatario: string,
    @Body('token') token: string,
  ) {
    const asunto = '📣 Encuesta de Compromiso 2023 -2';
    const mensaje = `<p>Buenas tardes a todos y todas,</p>
<p>En Continental valoramos la opinión de nuestros colaboradores y nos esforzamos por crear un entorno de trabajo positivo y centrado en las personas. Para lograrlo, es fundamental entender tus necesidades, expectativas y sugerencias.</p>
<p>Por esta razón, te invitamos a realizar la Encuesta de Engagement 2023-2, la cual nos ayudará a medir el nivel de compromiso y clima de nuestros colaboradores en relación con su trabajo y con la organización. Tus respuestas son completamente anónimas y confidenciales, por lo que te animamos a ser lo más honesto posible. </p>
<p>Para contestar la encuesta, en el siguiente enlace: <a href='https://continental-engagement-front.vercel.app/?token=${token}'>Contestar encuesta</a></p> 
<p>Tu participación es fundamental para ayudarnos a identificar áreas de mejora y seguir fortaleciendo nuestro compromiso con el bienestar en la organización.</p>
<p>Si tienes alguna pregunta o experimentas algún problema técnico al acceder a la encuesta, no dudes en contactar a bienestarytalento@continental.edu.pe</p>
<br>
<p>Un abrazo,</p>
<p>Bienestar y Talento.</p>`;

    return this.mailsService.enviarCorreo(destinatario, asunto, mensaje);
  }
}

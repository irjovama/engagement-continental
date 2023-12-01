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
    const asunto = `¿Eres parte del 10% que aún no contesta la encuesta? 😯`;
    const mensaje = `<p>Buenos días a todos y todas,</p>
<p>En Continental valoramos la opinión de nuestros colaboradores y nos esforzamos por crear un entorno de trabajo positivo y centrado en las personas. Para lograrlo, es fundamental entender tus necesidades, expectativas y sugerencias.</p>
<p>Por esta razón, te invitamos a realizar la <strong>Encuesta de Engagement  y Clima 2023-2</strong>, la cual nos ayudará a medir el nivel de compromiso y clima de nuestros colaboradores en relación con su trabajo y con la organización. Tus respuestas son completamente anónimas y confidenciales, por lo que te animamos a ser lo más honesto posible.</p>    
<p>Para contestar la encuesta, en el siguiente enlace: <a href='https://continental-engagement-front.vercel.app/?token=${token}'>Contestar encuesta</a></p>    
<p>Tu participación es fundamental para ayudarnos a identificar áreas de mejora y seguir fortaleciendo nuestro compromiso con el bienestar en la organización.</p> 
<p>Recuerda que tienes hasta HOY para responder.</p>
<p>Si tienes alguna pregunta o experimentas algún problema técnico al acceder a la encuesta, no dudes en contactar a bienestarytalento@continental.edu.pe</p>
<p>Un abrazo,</p>
<p>Bienestar y Talento.</p>
    `;
    //     const asunto = `¿Y la encuesta de Engagement y Clima? 🥲`;
    //     const mensaje = `<p>Buenos días a todos y todas,</p>
    // <p>En Continental valoramos la opinión de nuestros colaboradores y nos esforzamos por crear un entorno de trabajo positivo y centrado en las personas.
    // Para lograrlo, es fundamental entender tus necesidades, expectativas y sugerencias.</p>
    // <p>Por esta razón, te invitamos a realizar la Encuesta de <strong>Engagement y Clima 2023-2</strong>,
    // la cual nos ayudará a medir el nivel de compromiso y clima de nuestros colaboradores en relación con su trabajo y con la organización.
    // Tus respuestas son completamente anónimas y confidenciales, por lo que te animamos a ser lo más honesto posible.</p>
    // <p>Para contestar la encuesta, en el siguiente enlace: <a href='https://continental-engagement-front.vercel.app/?token=${token}'>Contestar encuesta</a></p>
    // <p>Tu participación es fundamental para ayudarnos a identificar áreas de mejora y seguir fortaleciendo nuestro compromiso con el bienestar en la organización.</p>
    // <p>Recuerda que tienes hasta el jueves 30 para responderla.</p>
    // <p>Si tienes alguna pregunta o experimentas algún problema técnico al acceder a la encuesta, no dudes en contactar a bienestarytalento@continental.edu.pe</p>
    // <p>Un abrazo,Bienestar y Talento.</p>`;
    //     const asunto = '¿Todavía no contestas la encuesta? 🧐';
    //     const mensaje = `<p>Buenos días a todos y todas, </p>
    // <p>En Continental valoramos la opinión de nuestros colaboradores y nos esforzamos por crear un entorno de trabajo positivo y centrado en las personas. Para lograrlo, es fundamental entender tus necesidades, expectativas y sugerencias.</p>
    // <p>Por esta razón, te invitamos a realizar la <strong>Encuesta de Engagement  y Clima 2023-2</strong>, la cual nos ayudará a medir el nivel de compromiso y clima de nuestros colaboradores en relación con su trabajo y con la organización. Tus respuestas son completamente anónimas y confidenciales, por lo que te animamos a ser lo más honesto posible. </p>
    // <p>Para contestar la encuesta, en el siguiente enlace: <a href='https://continental-engagement-front.vercel.app/?token=${token}'>Contestar encuesta</a></p>
    // <p>Tu participación es fundamental para ayudarnos a identificar áreas de mejora y seguir fortaleciendo nuestro compromiso con el bienestar en la organización.</p>
    // <p><strong>Sabemos que el día a día es intenso, por lo que hemos extendido el plazo hasta el jueves 30 de noviembre.</strong></p>
    // <p>Si tienes alguna pregunta o experimentas algún problema técnico al acceder a la encuesta, no dudes en contactar a bienestarytalento@continental.edu.pe</p>
    // <p>Un abrazo,</p>
    // <p>Bienestar y Talento.</p>`;
    //     const asunto = '¿Eres parte del 20% que aún no contesta la encuesta? 😯';
    //     const mensaje = `<p>Buenos días a todos y todas,</p>
    // <p>En Continental valoramos la opinión de nuestros colaboradores y nos esforzamos por crear un entorno de trabajo positivo y centrado en las personas. Para lograrlo, es fundamental entender tus necesidades, expectativas y sugerencias.</p>
    // <p>Por esta razón, te invitamos a realizar la Encuesta de Engagement 2023-2, la cual nos ayudará a medir el nivel de compromiso y clima de nuestros colaboradores en relación con su trabajo y con la organización. Tus respuestas son completamente anónimas y confidenciales, por lo que te animamos a ser lo más honesto posible.</p>
    // <p>Para contestar la encuesta, en el siguiente enlace: <a href='https://continental-engagement-front.vercel.app/?token=${token}'>Contestar encuesta</a></p>
    // <p>Tu participación es fundamental para ayudarnos a identificar áreas de mejora y seguir fortaleciendo nuestro compromiso con el bienestar en la organización.</p>
    // <p>Recuerda que tienes hasta el jueves 23 de noviembre para completarla.</p>
    // <p>Si tienes alguna pregunta o experimentas algún problema técnico al acceder a la encuesta, no dudes en contactar a bienestarytalento@continental.edu.pe</p>
    // <p>Un abrazo,</p>
    // <p>Bienestar y Talento.</p>`;
    //     const asunto = '📣 Encuesta de Engagement y Clima 2023 -2';
    //     const mensaje = `<p>Buenas tardes a todos y todas,</p>
    // <p>En Continental valoramos la opinión de nuestros colaboradores y nos esforzamos por crear un entorno de trabajo positivo y centrado en las personas. Para lograrlo, es fundamental entender tus necesidades, expectativas y sugerencias.</p>
    // <p>Por esta razón, te invitamos a realizar la <strong>Encuesta de Engagement 2023-2</strong>, la cual nos ayudará a medir el nivel de compromiso y clima de nuestros colaboradores en relación con su trabajo y con la organización. Tus respuestas son completamente <strong>anónimas y confidenciales</strong>, por lo que te animamos a ser lo más honesto posible. </p>
    // <p>Para contestar la encuesta, haz clic aquí: <a href='https://continental-engagement-front.vercel.app/?token=${token}'>Contestar encuesta</a></p>
    // <p>Tu participación es fundamental para ayudarnos a identificar áreas de mejora y seguir fortaleciendo nuestro compromiso con el bienestar en la organización.</p>
    // <p>Si tienes alguna pregunta o experimentas algún problema técnico al acceder a la encuesta, no dudes en contactar a bienestarytalento@continental.edu.pe</p>
    // <br>
    // <p>Un abrazo,</p>
    // <p>Bienestar y Talento.</p>`;

    return this.mailsService.enviarCorreo(destinatario, asunto, mensaje);
  }
}

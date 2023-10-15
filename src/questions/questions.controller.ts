import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { QuestionsService } from './questions.service';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';

@Controller('categories/:categoryId/questions')
export class QuestionsController {
  constructor(private readonly questionsService: QuestionsService) {}

  @Post()
  create(
    @Body() createQuestionDto: CreateQuestionDto,
    @Param('categoryId') categoryId: string,
  ) {
    return this.questionsService.create(createQuestionDto, categoryId);
  }

  @Get()
  findAll(@Param('categoryId') categoryId: string, @Query() query: any) {
    return this.questionsService.findAll(query, categoryId);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Param('categoryId') categoryId: string) {
    return this.questionsService.findOne(+id, categoryId);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateQuestionDto: UpdateQuestionDto,
    @Param('categoryId') categoryId: string,
  ) {
    return this.questionsService.update(+id, updateQuestionDto, categoryId);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Param('categoryId') categoryId: string) {
    return this.questionsService.remove(+id, categoryId);
  }
}

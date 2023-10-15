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
import { ResultsService } from './results.service';
import { CreateResultDto } from './dto/create-result.dto';
import { UpdateResultDto } from './dto/update-result.dto';

@Controller('categories/:categoryId/questions/:questionId/results')
export class ResultsController {
  constructor(private readonly resultsService: ResultsService) {}

  @Post()
  create(
    @Body() createResultDto: CreateResultDto,
    @Param('categoryId') categoryId: string,
    @Param('questionId') questionId: string,
  ) {
    this.resultsService.setParams({ categoryId, questionId });
    return this.resultsService.create(createResultDto);
  }

  @Get()
  findAll(
    @Param('categoryId') categoryId: string,
    @Param('questionId') questionId: string,
    @Query('limit') limit: number,
    @Query('page') page: number,
  ) {
    this.resultsService.setParams({ categoryId, questionId, limit, page });
    return this.resultsService.findAll();
  }

  @Get(':id')
  findOne(
    @Param('id') id: string,
    @Param('categoryId') categoryId: string,
    @Param('questionId') questionId: string,
  ) {
    this.resultsService.setParams({ categoryId, questionId });
    return this.resultsService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateResultDto: UpdateResultDto,
    @Param('categoryId') categoryId: string,
    @Param('questionId') questionId: string,
  ) {
    this.resultsService.setParams({ categoryId, questionId });
    return this.resultsService.update(+id, updateResultDto);
  }

  @Delete(':id')
  remove(
    @Param('id') id: string,
    @Param('categoryId') categoryId: string,
    @Param('questionId') questionId: string,
  ) {
    this.resultsService.setParams({ categoryId, questionId });
    return this.resultsService.remove(+id);
  }
}

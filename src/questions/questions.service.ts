import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Question } from './entities/question.entity';
import { Repository } from 'typeorm/repository/Repository';
import { CategoriesService } from 'src/categories/categories.service';
@Injectable()
export class QuestionsService {
  constructor(
    @InjectRepository(Question)
    private readonly questionsRepository: Repository<Question>,
    private readonly categoriesService: CategoriesService,
  ) {}
  async create(createQuestionDto: CreateQuestionDto, categoryId: string) {
    const category = await this.categoriesService.findOne(+categoryId);

    try {
      createQuestionDto.category = category;
      const question = this.questionsRepository.create(createQuestionDto);
      const created = await this.questionsRepository.save(question);
      return { message: 'Question creada correctamente ', id: created.id };
    } catch (error) {
      throw new BadRequestException('No se puedo crear question');
    }
  }

  async findAll(query: any, categoryId: string) {
    await this.categoriesService.findOne(+categoryId);

    const skip = (query.page - 1) * query.limit;
    const [data, totalItems] = await this.questionsRepository
      .createQueryBuilder('questions')
      .innerJoinAndSelect('questions.category', 'category')
      .where('category.id = :categoryId', { categoryId })
      .skip(skip)
      .take(query.limit)
      .getManyAndCount();
    const totalPages = Math.ceil(totalItems / query.limit);
    return { data, totalItems, totalPages };
  }

  async findOne(id: number, categoryId: string) {
    const question = await this.questionsRepository
      .createQueryBuilder('questions')
      .innerJoinAndSelect('questions.category', 'category')
      .where('questions.id = :id and category.id=:categoryId', {
        id,
        categoryId,
      })
      .getOne();

    if (!question) throw new BadRequestException('No se encuentra la question');

    return question;
  }

  async update(
    id: number,
    updateQuestionDto: UpdateQuestionDto,
    categoryId: string,
  ) {
    await this.findOne(id, categoryId);

    try {
      await this.questionsRepository.update(id, updateQuestionDto);
      return { message: 'Question actualizada correctamente' };
    } catch (error) {
      throw new BadRequestException('No se pudo actualizar la question');
    }
  }

  async remove(id: number, categoryId: string) {
    await this.findOne(id, categoryId);

    try {
      await this.questionsRepository.delete(id);
      return { message: 'Question borrada correctamente' };
    } catch (error) {
      throw new BadRequestException('No se pudo borrada la question');
    }
  }
}

import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateResultDto } from './dto/create-result.dto';
import { UpdateResultDto } from './dto/update-result.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Result } from './entities/result.entity';
import { Repository } from 'typeorm/repository/Repository';
import { QuestionsService } from 'src/questions/questions.service';
import { UsersService } from 'src/users/users.service';
@Injectable()
export class ResultsService {
  public categoryId: string;
  public questionId: string;
  public limit: number;
  public page: number;

  constructor(
    @InjectRepository(Result)
    private readonly resultRepository: Repository<Result>,
    private readonly questionsService: QuestionsService,
    private readonly usersService: UsersService,
  ) {}

  setParams({ categoryId, questionId, limit = 10, page = 1 }) {
    this.categoryId = categoryId;
    this.questionId = questionId;
    this.limit = limit;
    this.page = page;
  }

  async create(createResultDto: CreateResultDto) {
    const question = await this.questionsService.findOne(
      +this.questionId,
      this.categoryId,
    );
    const user = await this.usersService.findOneByToken(createResultDto.token);
    try {
      createResultDto.question = question;
      createResultDto.user = user;
      const result = this.resultRepository.create(createResultDto);
      const created = await this.resultRepository.save(result);
      return { message: 'Resultado creado correctamente', id: created.id };
    } catch (error) {
      throw new BadRequestException('No se pudo crear el resultado');
    }
  }

  async findAll() {
    await this.questionsService.findOne(+this.questionId, this.categoryId);

    const skip = (this.page - 1) * this.limit;
    const [data, totalItems] = await this.resultRepository
      .createQueryBuilder('results')
      .innerJoinAndSelect('results.question', 'question')
      .where(' question.id = :questionId', { questionId: this.questionId })
      .skip(skip)
      .take(this.limit)
      .getManyAndCount();
    const totalPages = Math.ceil(totalItems / this.limit);
    return { data, totalItems, totalPages };
  }

  async findAllByToken(token: string) {
    const data = await this.resultRepository
      .createQueryBuilder('results')
      .innerJoinAndSelect('results.user', 'user')
      .where(' user.token = :token', { token })

      .getMany();
    return data;
  }

  async findOne(id: number) {
    const result = await this.resultRepository
      .createQueryBuilder('results')
      .innerJoinAndSelect('results.question', 'question')
      .where(' question.id = :questionId and results.id = :resultId', {
        questionId: this.questionId,
        resultId: id,
      })
      .getOne();

    if (!result) throw new BadRequestException('No se encontró el resultado');

    return result;
  }

  async update(id: number, updateResultDto: UpdateResultDto) {
    await this.findOne(id);

    try {
      await this.resultRepository.update(id, updateResultDto);
      return { message: 'El resultado se actualizó correctamente' };
    } catch (error) {
      throw new BadRequestException('No se pudo actualizó el resultado');
    }
  }

  async remove(id: number) {
    await this.findOne(id);

    try {
      await this.resultRepository.delete(id);
      return { message: 'El resultado se borro correctamente' };
    } catch (error) {
      throw new BadRequestException('No se pudo borrar el resultado');
    }
  }
}

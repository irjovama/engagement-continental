import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './entities/category.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Question } from 'src/questions/entities/question.entity';
@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
    @InjectRepository(Question)
    private readonly questionsRepository: Repository<Question>,
  ) {}
  async create(createCategoryDto: CreateCategoryDto) {
    const category = this.categoryRepository.create(createCategoryDto);
    try {
      const saved = await this.categoryRepository.save(category);
      return { message: 'Categoria creada correctamente', id: saved.id };
    } catch (error) {
      throw new BadRequestException('No se pudo crear la categoria');
    }
  }

  async findAll(query: any) {
    const skip = (query.page - 1) * query.limit;
    let data2 = [];
    const [data, totalItems] = await this.categoryRepository
      .createQueryBuilder('categories')
      .leftJoinAndSelect('categories.questions', 'questions')
      .leftJoinAndSelect('questions.options', 'options')
      .addOrderBy('categories.index', 'ASC')
      .addOrderBy('questions.index', 'ASC')
      .addOrderBy('options.index', 'ASC')
      .skip(skip)
      .take(query.limit)
      .getManyAndCount();
    const totalPages = Math.ceil(totalItems / query.limit);
    if (query?.results) {
      console.log('entro');
      data2 = await this.questionsRepository
        .createQueryBuilder('questions')
        .leftJoinAndSelect('questions.options', 'options')
        .leftJoinAndSelect('questions.results', 'results')
        .addOrderBy('questions.index', 'ASC')
        .addOrderBy('options.index', 'ASC')
        .getMany();
      for (let index in data) {
        for (let qindex in data[index].questions) {
          const id = data[index].questions[qindex].id;
          const data2Question = data2.find((d2) => d2.id === id);
          data[index].questions[qindex].results = data2Question?.results ?? [];
        }
      }
    }
    if (query?.token) {
      data2 = await this.questionsRepository
        .createQueryBuilder('questions')
        .leftJoinAndSelect('questions.options', 'options')
        .leftJoinAndSelect('questions.results', 'results')
        .addOrderBy('questions.index', 'ASC')
        .addOrderBy('options.index', 'ASC')
        .leftJoin('results.user', 'user')
        .where('user.token = :token', query)
        .getMany();
      for (let index in data) {
        for (let qindex in data[index].questions) {
          const id = data[index].questions[qindex].id;
          const data2Question = data2.find((d2) => d2.id === id);
          data[index].questions[qindex].results = data2Question?.results ?? [];
        }
      }
    }
    return { data, totalItems, totalPages };
  }

  async findOne(id: number) {
    const category = await this.categoryRepository.findOneBy({ id });

    if (!category) throw new BadRequestException('No se encontró la categoria');

    return category;
  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto) {
    try {
      await this.categoryRepository.update(id, updateCategoryDto);
      return { message: 'Categoria actualizada correctamente' };
    } catch (error) {
      throw new BadRequestException('No se pudo actualizar la categoria');
    }
  }

  async remove(id: number) {
    try {
      await this.categoryRepository.softDelete(id);
      return { message: 'Categoria borrada correctamente' };
    } catch (error) {
      throw new BadRequestException('No se pudo borrar la categoria');
    }
  }
}

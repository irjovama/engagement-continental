import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './entities/category.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
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
    const [data, totalItems] = await this.categoryRepository
      .createQueryBuilder('categories')
      .skip(skip)
      .take(query.limit)
      .getManyAndCount();
    const totalPages = Math.ceil(totalItems / query.limit);
    return { data, totalItems, totalPages };
  }

  async findOne(id: number) {
    return await this.categoryRepository.findOneBy({ id });
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
      await this.categoryRepository.delete(id);
      return { message: 'Categoria borrada correctamente' };
    } catch (error) {
      throw new BadRequestException('No se pudo borrar la categoria');
    }
  }
}

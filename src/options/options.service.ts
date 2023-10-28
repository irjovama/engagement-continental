import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateOptionDto } from './dto/create-option.dto';
import { UpdateOptionDto } from './dto/update-option.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Option } from './entities/option.entity';

@Injectable()
export class OptionsService {
  constructor(
    @InjectRepository(Option)
    private readonly optionsRepository: Repository<Option>,
  ) {}
  async create(createOptionDto: CreateOptionDto) {
    const option = this.optionsRepository.create(createOptionDto);
    const created = await this.optionsRepository.save(option);

    if (!created) throw new BadRequestException('No se pudo crear la opcion');

    return { message: 'Se creo correctamente', id: created.id };
  }

  async findAll() {
    const options = await this.optionsRepository.find();

    if (!options) throw new BadRequestException('No hay options');

    return options;
  }

  async findOne(id: number) {
    const option = await this.optionsRepository.findOneBy({ id });

    if (!option) throw new BadRequestException('No se encontró la opcion');

    return option;
  }

  async update(id: number, updateOptionDto: UpdateOptionDto) {
    await this.findOne(id);

    const updated = await this.optionsRepository.update(id, updateOptionDto);

    if (!updated) throw new BadRequestException('No se pudo actualizar');

    return { message: 'Actualizado correctamente' };
  }

  async remove(id: number) {
    await this.findOne(id);

    const updated = await this.optionsRepository.delete(id);

    if (!updated) throw new BadRequestException('No se pudo borrar');

    return { message: 'Borrado correctamente' };
  }
}

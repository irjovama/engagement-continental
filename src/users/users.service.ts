import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}
  async create(createUserDto: CreateUserDto) {
    const user = this.userRepository.create(createUserDto);

    try {
      const saved = await this.userRepository.save(user);
      return { message: 'Usuario creado correctamente', id: saved.id };
    } catch (error) {
      throw new BadRequestException('No se pudo crear el usuario');
    }
  }

  async findAll(query: any) {
    const skip = (query.page - 1) * query.limit;
    const [data, totalItems] = await this.userRepository
      .createQueryBuilder('users')
      .skip(skip)
      .take(query.limit)
      .getManyAndCount();
    const totalPages = Math.ceil(totalItems / query.limit);
    return { data, totalItems, totalPages };
  }

  async findOne(id: number) {
    return await this.userRepository.findOneBy({ id });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    try {
      await this.userRepository.update(id, updateUserDto);
      return { message: 'Se actualizó correctamente el usuario' };
    } catch (error) {
      throw new BadRequestException('No se pudo actualizar el usuario');
    }
  }

  async remove(id: number) {
    try {
      await this.userRepository.delete(id);
      return { message: 'Se eliminó correctamente el usuario' };
    } catch (error) {
      throw new BadRequestException('No se pudo eliminar el usuario');
    }
  }
}

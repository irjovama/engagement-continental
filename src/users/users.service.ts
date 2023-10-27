import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}
  async create(createUserDto: CreateUserDto) {
    try {
      createUserDto.token = await this.hashEmail(createUserDto.email);
      const user = this.userRepository.create(createUserDto);
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
    const user = await this.userRepository.findOneBy({ id });

    if (!user) throw new BadRequestException('No se encontró el usuario');

    return user;
  }

  async findOneByToken(token: string) {
    const user = await this.userRepository
      .createQueryBuilder('users')
      .where('users.token = :token', { token })
      .getOne();

    if (!user) throw new BadRequestException('No se encontró el usuario');

    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    try {
      if (updateUserDto?.token) {
        updateUserDto.token = await this.hashEmail(updateUserDto.email);
      }
      await this.userRepository.update(id, updateUserDto);
      return { message: 'Se actualizó correctamente el usuario' };
    } catch (error) {
      throw new BadRequestException('No se pudo actualizar el usuario');
    }
  }

  async remove(id: number) {
    try {
      await this.userRepository.softDelete(id);
      return { message: 'Se eliminó correctamente el usuario' };
    } catch (error) {
      throw new BadRequestException('No se pudo eliminar el usuario');
    }
  }

  async hashEmail(email: string): Promise<string> {
    const saltRounds = 10; // Número de rondas de sal para el cifrado
    const hashedPassword = await bcrypt.hash(email, saltRounds);
    return hashedPassword;
  }

  async comparePassword(
    password: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return bcrypt.compare(password, hashedPassword);
  }
}

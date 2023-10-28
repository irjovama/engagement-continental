import { Question } from 'src/questions/entities/question.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Option {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  index: number;

  @Column()
  group: string;

  @Column()
  label: string;

  @Column()
  value: string;

  @ManyToMany(() => Question, (question) => question.options)
  @JoinTable()
  questions: Question[];
}

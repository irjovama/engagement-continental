import { Category } from 'src/categories/entities/category.entity';
import { Option } from 'src/options/entities/option.entity';
import { Result } from 'src/results/entities/result.entity';
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
  DeleteDateColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';
export type questionTypes = 'scale' | 'input';
@Entity()
export class Question {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @ManyToOne(() => Category, (category) => category.id)
  category: Category;

  @OneToMany(() => Result, (result) => result.question)
  results: Result[];

  @Column()
  content: string;

  @ManyToMany(() => Option, (option) => option.questions)
  @JoinTable()
  options: Option[];

  @DeleteDateColumn()
  deleteAt: Date;
}

import { Category } from 'src/categories/entities/category.entity';
import { Result } from 'src/results/entities/result.entity';
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
  DeleteDateColumn,
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

  @Column()
  type: questionTypes;

  @Column()
  minRange: number;

  @Column()
  maxRange: number;

  @Column()
  maxLength: number;

  @DeleteDateColumn()
  deleteAt: Date;
}

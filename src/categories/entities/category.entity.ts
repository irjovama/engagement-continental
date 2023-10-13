import { PrimaryGeneratedColumn, Column, OneToMany, Entity } from 'typeorm';
import { Question } from 'src/questions/entities/question.entity';
@Entity()
export class Category {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @OneToMany(() => Question, (question) => question.category)
  questions: Question[];
}

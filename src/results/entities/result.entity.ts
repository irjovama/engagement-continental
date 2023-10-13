import { Question } from 'src/questions/entities/question.entity';
import { User } from 'src/users/entities/user.entity';
import { Entity, PrimaryGeneratedColumn, ManyToOne, Column } from 'typeorm';
@Entity()
export class Result {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @ManyToOne(() => Question, (question) => question.id)
  question: Question;

  @Column()
  value: string;

  @ManyToOne(() => User, (user) => user.id)
  user: User;
}

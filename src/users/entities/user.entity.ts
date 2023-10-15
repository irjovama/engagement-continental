import { Result } from 'src/results/entities/result.entity';
import { Entity, PrimaryGeneratedColumn, OneToMany, Column } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @OneToMany(() => Result, (result) => result.user)
  results: Result[];

  @Column()
  email: string;

  @Column()
  name: string;

  @Column()
  token: string;
}

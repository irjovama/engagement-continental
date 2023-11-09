import { Result } from 'src/results/entities/result.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  OneToMany,
  Column,
  DeleteDateColumn,
} from 'typeorm';

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

  @Column()
  finishedAt: Date;

  @Column()
  modality: string;

  @Column()
  unidadDeNegocio: string;

  @Column()
  areaDeTrabajo: string;

  @Column()
  subAreaDeTrabajo: string;

  @Column()
  ubicacionFisica: string;

  @Column()
  local: string;

  @Column()
  naturalezaDelPuesto: string;

  @Column()
  grupoOcupacionalNivel2: string;

  @Column()
  genero: string;

  @Column()
  fechaDeIngreso: string;

  @Column()
  tipoDeContrato: string;

  @Column()
  anosEnLaOrganizacion: string;

  @Column()
  tiempoDeServicioAnos: string;

  @Column()
  tiempodeServicioMeses: string;

  @Column()
  tiempoDeServicioDias: string;

  @Column()
  edad: string;

  @Column()
  generacion: string;

  @DeleteDateColumn()
  deleteAt: Date;
}

import { Module } from '@nestjs/common';
import { ResultsService } from './results.service';
import { ResultsController } from './results.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Result } from './entities/result.entity';
import { QuestionsModule } from 'src/questions/questions.module';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [TypeOrmModule.forFeature([Result]), QuestionsModule, UsersModule],
  controllers: [ResultsController],
  providers: [ResultsService],
})
export class ResultsModule {}

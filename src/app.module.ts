import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { QuestionsModule } from './questions/questions.module';
import { CategoriesModule } from './categories/categories.module';
import { ResultsModule } from './results/results.module';

@Module({
  imports: [UsersModule, QuestionsModule, CategoriesModule, ResultsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

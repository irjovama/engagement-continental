import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { QuestionsModule } from './questions/questions.module';
import { CategoriesModule } from './categories/categories.module';
import { ResultsModule } from './results/results.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { config } from 'dotenv';
import { OptionsModule } from './options/options.module';
config();

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_SHEMA,
      autoLoadEntities: true,
      synchronize: true,
      logging: true,
    }),
    UsersModule,
    QuestionsModule,
    CategoriesModule,
    ResultsModule,
    OptionsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

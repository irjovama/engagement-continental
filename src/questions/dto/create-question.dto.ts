import { Category } from 'src/categories/entities/category.entity';
import { Option } from 'src/options/entities/option.entity';

export class CreateQuestionDto {
  category: Category;
  options: Option[];
}

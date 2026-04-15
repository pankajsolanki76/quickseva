import { Controller, Get } from '@nestjs/common';
import { CategoryService } from './category.service';
import { BaseController } from 'src/common/base/base.controller';

@Controller('categories')
export class CategoryController extends BaseController {
  constructor(service: CategoryService) {
    super(service);
  }

  @Get('full-tree')
  getFullTree() {
    return this.service.getFullTree();
  }
}

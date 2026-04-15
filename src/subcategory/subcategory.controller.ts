import { Controller, Get, Query } from '@nestjs/common';
import { SubcategoryService } from './subcategory.service';
import { BaseController } from 'src/common/base/base.controller';

@Controller('subcategories')
export class SubcategoryController extends BaseController {
  constructor(service: SubcategoryService) {
    super(service);
  }

  @Get()
  findAll(@Query('categoryId') categoryId?: string) {
    return this.service.findAll(categoryId);
  }
}

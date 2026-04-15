import { Controller, Get, Query } from '@nestjs/common';
import { ServiceService } from './service.service';
import { BaseController } from 'src/common/base/base.controller';

@Controller('services')
export class ServiceController extends BaseController {
  constructor(service: ServiceService) {
    super(service);
  }

  @Get()
  findAll(@Query('subCategoryId') subCategoryId?: string) {
    return this.service.findAll(subCategoryId);
  }
}

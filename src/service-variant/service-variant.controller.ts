import { Controller, Get, Query } from '@nestjs/common';
import { ServiceVariantService } from './service-variant.service';
import { BaseController } from 'src/common/base/base.controller';

@Controller('service-variants')
export class ServiceVariantController extends BaseController {
  constructor(service: ServiceVariantService) {
    super(service);
  }

  @Get()
  findAll(@Query('serviceId') serviceId?: string) {
    return this.service.findAll(serviceId);
  }
}

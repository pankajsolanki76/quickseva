import { Module } from '@nestjs/common';
import { ServiceVariantService } from './service-variant.service';
import { ServiceVariantController } from './service-variant.controller';

@Module({
  controllers: [ServiceVariantController],
  providers: [ServiceVariantService],
})
export class ServiceVariantModule {}

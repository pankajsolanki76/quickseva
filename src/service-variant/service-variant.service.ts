import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { BaseService } from 'src/common/base/base.service';
import { CreateServiceVariantDto } from './dto/create-service-variant.dto';
import { UpdateServiceVariantDto } from './dto/update-service-variant.dto';

@Injectable()
export class ServiceVariantService extends BaseService<
  'serviceVariant',
  CreateServiceVariantDto,
  UpdateServiceVariantDto
> {
  constructor(protected prisma: PrismaService) {
    super(prisma, 'serviceVariant');
  }

  async create(dto: CreateServiceVariantDto) {
    const service = await this.prisma.service.findUnique({
      where: { id: dto.serviceId },
    });

    if (!service) {
      throw new NotFoundException('Service not found');
    }

    return super.create({
      ...dto,
      isActive: dto.isActive ?? true,
    });
  }

  findAll(serviceId?: string) {
    return super.findAll({
      where: serviceId ? { serviceId } : {},
    });
  }

  async update(id: string, dto: UpdateServiceVariantDto) {
    if (dto.serviceId) {
      const service = await this.prisma.service.findUnique({
        where: { id: dto.serviceId },
      });

      if (!service) {
        throw new NotFoundException('Service not found');
      }
    }

    return super.update(id, dto);
  }
}

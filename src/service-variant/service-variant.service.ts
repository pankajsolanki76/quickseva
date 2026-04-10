import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateServiceVariantDto } from './dto/create-service-variant.dto';
import { UpdateServiceVariantDto } from './dto/update-service-variant.dto';

@Injectable()
export class ServiceVariantService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateServiceVariantDto) {
    const service = await this.prisma.service.findUnique({
      where: { id: dto.serviceId },
    });

    if (!service) {
      throw new NotFoundException('Service not found');
    }

    return this.prisma.serviceVariant.create({
      data: {
        name: dto.name,
        price: dto.price,
        duration: dto.duration,
        isActive: dto.isActive ?? true,
        serviceId: dto.serviceId,
      },
    });
  }

  findAll(serviceId?: string) {
    return this.prisma.serviceVariant.findMany({
      where: serviceId ? { serviceId } : {},
      orderBy: { createdAt: 'desc' },
    });
  }

  findOne(id: string) {
    return this.prisma.serviceVariant.findUnique({
      where: { id },
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

    return this.prisma.serviceVariant.update({
      where: { id },
      data: dto,
    });
  }

  remove(id: string) {
    return this.prisma.serviceVariant.delete({
      where: { id },
    });
  }
}

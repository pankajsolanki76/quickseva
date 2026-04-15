import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { BaseService } from 'src/common/base/base.service';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';

@Injectable()
export class ServiceService extends BaseService<
  'service',
  CreateServiceDto,
  UpdateServiceDto
> {
  constructor(protected prisma: PrismaService) {
    super(prisma, 'service');
  }

  async create(dto: CreateServiceDto) {
    const subCategory = await this.prisma.subCategory.findUnique({
      where: { id: dto.subCategoryId },
    });

    if (!subCategory) {
      throw new NotFoundException('SubCategory not found');
    }

    return super.create(dto);
  }

  findAll(subCategoryId?: string) {
    return super.findAll({
      where: subCategoryId ? { subCategoryId } : {},
    });
  }

  async update(id: string, dto: UpdateServiceDto) {
    if (dto.subCategoryId) {
      const subCategory = await this.prisma.subCategory.findUnique({
        where: { id: dto.subCategoryId },
      });

      if (!subCategory) {
        throw new NotFoundException('SubCategory not found');
      }
    }

    return super.update(id, dto);
  }
}
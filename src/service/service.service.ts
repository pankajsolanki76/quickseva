import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';

@Injectable()
export class ServiceService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateServiceDto) {
    const subCategory = await this.prisma.subCategory.findUnique({
      where: { id: dto.subCategoryId },
    });

    if (!subCategory) {
      throw new NotFoundException('SubCategory not found');
    }

    return this.prisma.service.create({
      data: {
        name: dto.name,
        description: dto.description,
        subCategoryId: dto.subCategoryId,
      },
    });
  }

  findAll(subCategoryId?: string) {
    return this.prisma.service.findMany({
      where: subCategoryId ? { subCategoryId } : {},
      orderBy: { createdAt: 'desc' },
    });
  }

  findOne(id: string) {
    return this.prisma.service.findUnique({
      where: { id },
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

    return this.prisma.service.update({
      where: { id },
      data: dto,
    });
  }

  remove(id: string) {
    return this.prisma.service.delete({
      where: { id },
    });
  }
}

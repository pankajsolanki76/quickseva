import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateSubcategoryDto } from './dto/create-subcategory.dto';
import { UpdateSubcategoryDto } from './dto/update-subcategory.dto';

@Injectable()
export class SubcategoryService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateSubcategoryDto) {
    const category = await this.prisma.category.findUnique({
      where: { id: dto.categoryId },
    });

    if (!category) {
      throw new NotFoundException('Category not found');
    }

    return this.prisma.subCategory.create({
      data: {
        name: dto.name,
        categoryId: dto.categoryId,
      },
    });
  }

  findAll(categoryId?: string) {
    return this.prisma.subCategory.findMany({
      where: categoryId ? { categoryId } : {},
      orderBy: { createdAt: 'desc' },
    });
  }

  findOne(id: string) {
    return this.prisma.subCategory.findUnique({
      where: { id },
    });
  }

  async update(id: string, dto: UpdateSubcategoryDto) {
    if (dto.categoryId) {
      const category = await this.prisma.category.findUnique({
        where: { id: dto.categoryId },
      });

      if (!category) {
        throw new NotFoundException('Category not found');
      }
    }

    return this.prisma.subCategory.update({
      where: { id },
      data: dto,
    });
  }

  remove(id: string) {
    return this.prisma.subCategory.delete({
      where: { id },
    });
  }
}

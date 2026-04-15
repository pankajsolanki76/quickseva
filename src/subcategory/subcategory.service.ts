import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { BaseService } from 'src/common/base/base.service';
import { CreateSubcategoryDto } from './dto/create-subcategory.dto';
import { UpdateSubcategoryDto } from './dto/update-subcategory.dto';

@Injectable()
export class SubcategoryService extends BaseService<
  'subCategory',
  CreateSubcategoryDto,
  UpdateSubcategoryDto
> {
  constructor(protected prisma: PrismaService) {
    super(prisma, 'subCategory');
  }

  async create(dto: CreateSubcategoryDto) {
    const category = await this.prisma.category.findUnique({
      where: { id: dto.categoryId },
    });

    if (!category) {
      throw new NotFoundException('Category not found');
    }

    return super.create(dto);
  }

  findAll(categoryId?: string) {
    return super.findAll({
      where: categoryId ? { categoryId } : {},
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

    return super.update(id, dto);
  }
}
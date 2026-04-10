import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Injectable()
export class CategoryService {
  constructor(private prisma: PrismaService) {}

  create(dto: CreateCategoryDto) {
    return this.prisma.category.create({
      data: dto,
    });
  }

  findAll() {
    return this.prisma.category.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }

  findOne(id: string) {
    return this.prisma.category.findUnique({
      where: { id },
    });
  }

  update(id: string, dto: UpdateCategoryDto) {
    return this.prisma.category.update({
      where: { id },
      data: dto,
    });
  }

  remove(id: string) {
    return this.prisma.category.delete({
      where: { id },
    });
  }

  async getFullTree() {
    return this.prisma.category.findMany({
      orderBy: { createdAt: 'desc' },
      include: {
        subCategories: {
          orderBy: { createdAt: 'desc' },
          include: {
            services: {
              orderBy: { createdAt: 'desc' },
              include: {
                variants: {
                  where: { isActive: true },
                  orderBy: { createdAt: 'desc' },
                },
              },
            },
          },
        },
      },
    });
  }
}

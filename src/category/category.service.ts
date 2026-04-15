import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { BaseService } from 'src/common/base/base.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Injectable()
export class CategoryService extends BaseService<
  'category',
  CreateCategoryDto,
  UpdateCategoryDto
> {
  constructor(prisma: PrismaService) {
    super(prisma, 'category');
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
import { PrismaService } from 'src/prisma/prisma.service';

export class BaseService<T, CreateDto, UpdateDto> {
  constructor(
    protected prisma: PrismaService,
    private model: keyof PrismaService,
  ) {}

  create(dto: CreateDto) {
    return (this.prisma[this.model] as any).create({
      data: dto,
    });
  }

  findAll(params: any = {}) {
    return (this.prisma[this.model] as any).findMany({
      orderBy: { createdAt: 'desc' },
      ...params,
    });
  }

  findOne(id: string) {
    return (this.prisma[this.model] as any).findUnique({
      where: { id },
    });
  }

  update(id: string, dto: UpdateDto) {
    return (this.prisma[this.model] as any).update({
      where: { id },
      data: dto,
    });
  }

  remove(id: string) {
    return (this.prisma[this.model] as any).delete({
      where: { id },
    });
  }
}
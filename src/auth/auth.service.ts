import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

  async validateUser(payload: any) {
    const auth0Id = payload.sub;
    const email = payload.email;
    const name = payload.name || '';

    let user = await this.prisma.user.findUnique({
      where: { auth0Id },
      include: {  
        roles: {
          include: {
            role: true,
          },
        },
      },
    });

    // 🆕 Create user if not exists
    if (!user) {
      // 👉 Default role = CUSTOMER
      const customerRole = await this.prisma.role.findUnique({
        where: { name: 'CUSTOMER' },
      });
      if (!customerRole) {
        throw new Error('CUSTOMER role not found. Did you run seed?');
      }

      user = await this.prisma.user.create({
        data: {
          auth0Id,
          email,
          name,
          roles: {
            create: {
              roleId: customerRole.id,
            },
          },
        },
        include: {
          roles: {
            include: { role: true },
          },
        },
      });
    }

    // 🔥 Attach roles to request.user
    return {
      id: user.id,
      email: user.email,
      roles: user.roles.map((r) => r.role.name),
    };
  }
}

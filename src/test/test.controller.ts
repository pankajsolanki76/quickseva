import { Controller, Get, UseGuards } from '@nestjs/common';

import { Roles } from '../common/decorators/roles.decorator';
import { JwtAuthGuard } from 'src/auth/jwt-auth/jwt-auth.guard';
import { RolesGuard } from 'src/auth/roles/roles.guard';

@Controller('test')
export class TestController {
  // 🔓 Public
  @Get('public')
  getPublic() {
    return 'Public route';
  }

  // 🔐 Any logged-in user
  @UseGuards(JwtAuthGuard)
  @Get('private')
  getPrivate() {
    return 'Logged in user';
  }

  // 👑 ADMIN only
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  @Get('admin')
  getAdmin() {
    return 'Admin only';
  }
}

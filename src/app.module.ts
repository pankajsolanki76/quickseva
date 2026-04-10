import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { TestController } from './test/test.controller';
import { CategoryModule } from './category/category.module';
import { SubcategoryModule } from './subcategory/subcategory.module';
import { ServiceModule } from './service/service.module';
import { ServiceVariantModule } from './service-variant/service-variant.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }),PrismaModule, AuthModule, CategoryModule, SubcategoryModule, ServiceModule, ServiceVariantModule],
  controllers: [AppController, TestController],
  providers: [AppService],
})
export class AppModule {}

import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  // In V7, we can leave the constructor empty or remove it entirely
  // Prisma will automatically look for DATABASE_URL in your process.env

  async onModuleInit() {
    // If the URL is missing, provide a helpful error message in the console
    if (!process.env.DATABASE_URL) {
      console.error('❌ ERROR: DATABASE_URL is not defined in .env file');
    }
    await this.$connect();
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}

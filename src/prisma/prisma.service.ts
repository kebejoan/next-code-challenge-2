import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  // In V7, we can leave the constructor empty or remove it entirely
  // Prisma will automatically look for DATABASE_URL in your process.env

  constructor() {
    super({
      adapter: new PrismaPg(
        new Pool({
          connectionString: process.env.DATABASE_URL,
        }),
      ),
    });
  }

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

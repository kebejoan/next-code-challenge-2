import { Module } from '@nestjs/common';
import { ThreadsService } from './threads.service';
import { ThreadsController } from './threads.controller';
import { ThreadsRepository } from './threads.repository';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [ThreadsController],
  providers: [ThreadsService, ThreadsRepository],
})
export class ThreadsModule {}

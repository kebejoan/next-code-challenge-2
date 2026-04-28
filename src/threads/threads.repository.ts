import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateThreadDto } from './dto/create-thread.dto';
import { Thread } from '@prisma/client';

@Injectable()
export class ThreadsRepository {
  constructor(private prisma: PrismaService) {}

  async createThread(dto: CreateThreadDto, userId: string): Promise<Thread> {
    return this.prisma.thread.create({
      data: {
        title: dto.title,
        content: dto.content,
        user_id: userId,
      },
    });
  }

  async getAllThreads() {
    return this.prisma.thread.findMany({
      include: {
        author: {
          select: {
            id: true,
            username: true,
            email: true,
          },
        },
      },
      orderBy: { created_at: 'desc' },
    });
  }

  async getThreadById(id: string) {
    return this.prisma.thread.findUnique({
      where: { id },
      include: {
        author: {
          select: {
            id: true,
            username: true,
            email: true,
          },
        },
      },
    });
  }
}

import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { User } from '@prisma/client';

@Injectable()
export class UsersRepository {
  constructor(private prisma: PrismaService) {}

  async findOne(id: string): Promise<User | null> {
    console.log(id);
    const user = await this.prisma.user.findUnique({ where: { id } });
    console.log(user);
    if (!user) return null;

    return user;
  }

  async findAll(): Promise<User[]> {
    return this.prisma.user.findMany();
  }
}

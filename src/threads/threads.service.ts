import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateThreadDto } from './dto/create-thread.dto';
import { UpdateThreadDto } from './dto/update-thread.dto';
import { ThreadsRepository } from './threads.repository';

@Injectable()
export class ThreadsService {
  constructor(private readonly threadsRepository: ThreadsRepository) {}
  create(createThreadDto: CreateThreadDto, userId: string) {
    return this.threadsRepository.createThread(createThreadDto, userId);
  }

  findAll() {
    return this.threadsRepository.getAllThreads();
  }

  findOne(id: string) {
    return this.threadsRepository.getThreadById(id);
  }

  findMany(UserId: string) {
    return this.threadsRepository.getThreadsByUserId(UserId);
  }

  async update(userId: string, id: string, createThreadDto: CreateThreadDto) {
    if (await this.validateUser(userId, id)) {
      return this.threadsRepository.updateThread(id, createThreadDto);
    }
  }

  async remove(userId: string, id: string) {
    if (await this.validateUser(userId, id)) {
      return this.threadsRepository.deleteThread(id.toString());
    }
  }

  //UTILS
  async validateUser(userId: string, id: string) {
    const thread = await this.threadsRepository.getThreadById(id);
    if (!thread) {
      throw new NotFoundException('Thread not found!');
    }

    if (thread.author.id !== userId) {
      throw new ForbiddenException('You are not the thread owner!');
    }
    return true;
  }
}

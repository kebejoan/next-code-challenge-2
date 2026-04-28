import { Injectable } from '@nestjs/common';
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

  update(id: number, updateThreadDto: UpdateThreadDto) {
    return `This action updates a #${id} thread`;
  }

  remove(id: number) {
    return `This action removes a #${id} thread`;
  }
}

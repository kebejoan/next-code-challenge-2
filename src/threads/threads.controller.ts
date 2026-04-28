import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
  Put,
} from '@nestjs/common';
import { ThreadsService } from './threads.service';
import { CreateThreadDto } from './dto/create-thread.dto';
import { UpdateThreadDto } from './dto/update-thread.dto';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt.auth-guard';
import type { AuthenticatedRequest } from 'src/auth/interface';

@ApiTags('threads')
@Controller('threads')
export class ThreadsController {
  constructor(private readonly threadsService: ThreadsService) {}

  @UseGuards(JwtAuthGuard)
  @Get('/my-threads')
  findByUser(@Request() req: AuthenticatedRequest) {
    return this.threadsService.findMany(req.user.sub);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  create(
    @Request() req: AuthenticatedRequest,
    @Body() createThreadDto: CreateThreadDto,
  ) {
    return this.threadsService.create(createThreadDto, req.user.sub);
  }

  @Get()
  findAll() {
    return this.threadsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.threadsService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  update(
    @Request() req: AuthenticatedRequest,
    @Param('id') id: string,
    @Body() createThreadDto: CreateThreadDto,
  ) {
    return this.threadsService.update(req.user.sub, id, createThreadDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Request() req: AuthenticatedRequest, @Param('id') id: string) {
    return this.threadsService.remove(req.user.sub, id);
  }
}

import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MinLength, MaxLength } from 'class-validator';

export class CreateThreadDto {
  @ApiProperty({
    description: 'The title of the thread',
    example: 'How to handle Prisma V7 errors?',
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  @MaxLength(100)
  title: string;

  @ApiProperty({
    description: 'The main content of the thread',
    example: 'I keep getting this initialization error...',
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(10)
  content: string;
}

import { Injectable, NotFoundException } from '@nestjs/common';
// import { CreateUserDto } from './dto/create-user.dto';
// import { UpdateUserDto } from './dto/update-user.dto';
import { UsersRepository } from './users.repository';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}
  async findOne(id: string) {
    const user = await this.usersRepository.findOne(id);
    if (!user) {
      throw new NotFoundException('User not found!');
    }
    const { password_hash, ...userWithoutPassword } = user;

    return userWithoutPassword;
  }

  findAll() {
    return this.usersRepository.findAll();
  }

  //Maybe can be used later for Admin purposes
  // create(createUserDto: CreateUserDto) {
  //   return 'This action adds a new user';
  // }

  // update(id: number, updateUserDto: UpdateUserDto) {
  //   return `This action updates a #${id} user`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} user`;
  // }
}

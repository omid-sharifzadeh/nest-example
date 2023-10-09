import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { EntityManager, Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
    private entityManager: EntityManager
  ) { }

  async create(createUserDto: CreateUserDto) {
    const user = new User(createUserDto);
    return await this.entityManager.save(user);
  }

  async findByEmail(email: string) {
    return await this.usersRepository.findOneBy({ email });
  }

  async findAll() {
    return await this.usersRepository.find({
      select: {
        id: true,
        email: true,
        status: true
      }
    });
  }
}

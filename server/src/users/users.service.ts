import { Injectable } from '@nestjs/common';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { FileUpload } from 'graphql-upload';
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private recipesRepository: Repository<User>,
  ) {}
  create(createUserInput: CreateUserInput, file: FileUpload) {
    return this.recipesRepository.save(createUserInput);
  }

  findAll() {
    return this.recipesRepository.find();
  }

  findOne(id: number) {
    return this.recipesRepository.findOneById(id);
  }

  update(id: number, updateUserInput: UpdateUserInput) {
    const user = this.recipesRepository.findOneById(id);
    return this.recipesRepository.save({ ...user, ...updateUserInput });
  }

  remove(id: number) {
    return this.recipesRepository.delete(id);
  }
}

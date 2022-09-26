import { Injectable } from '@nestjs/common';
import { UpdateUserInput } from './dto/update-user.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { SignUpInput } from './dto/signup.input';
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}
  async create(signUpInput: SignUpInput) {
    return await this.userRepository.save(signUpInput);
  }

  async findAll() {
    return await this.userRepository.find();
  }

  async findOne(id: number) {
    return await this.userRepository.findOneById(id);
  }

  async findByUsername(username: string) {
    return await this.userRepository.findOne({ where: { username } });
  }

  async findByEmail(email: string) {
    return await this.userRepository.findOne({ where: { email } });
  }

  async update(id: number, updateUserInput: UpdateUserInput) {
    const user: User = new User();
    Object.assign(user, updateUserInput);
    await this.userRepository.update(id, user);
  }
  async findOneWithRefreshTokens(id: number) {
    return await this.userRepository.findOne({
      where: { id },
      relations: ['refreshToken'],
    });
  }
  async remove(id: number) {
    return await this.userRepository.delete(id);
  }
}

import { Injectable } from '@nestjs/common';
import { CreateRefreshtokenInput } from './dto/create-refreshtoken.input';
import { InjectRepository } from '@nestjs/typeorm';
import { RefreshToken } from './entities/refreshtoken.entity';
import { Repository } from 'typeorm';
import { UpdateRefreshtokenInput } from './dto/update-refreshtoken.input';

@Injectable()
export class RefreshTokensService {
  constructor(
    @InjectRepository(RefreshToken)
    private refreshTokenRepository: Repository<RefreshToken>,
  ) {}

  async create(createRefreshtokenInput: CreateRefreshtokenInput) {
    return await this.refreshTokenRepository.save(createRefreshtokenInput);
  }

  async findAll() {
    return await this.refreshTokenRepository.find();
  }

  async findOne(id: number) {
    await this.refreshTokenRepository.findOneById(id);
  }
  async findOneWithUser(id: number) {
    return await this.refreshTokenRepository.find({
      where: { id },
      relations: ['user'],
    });
  }

  async findOneWithUserByToken(token: string) {
    return await this.refreshTokenRepository.find({
      where: { token },
    });
  }
  async updateByUserId(
    userId: number,
    updateRefreshTokenInput: UpdateRefreshtokenInput,
  ) {
    const oldRef = await this.refreshTokenRepository.find({
      relations: ['user'],
      where: {
        user: { id: userId },
      },
    });

    if (oldRef.length > 0) {
      await this.refreshTokenRepository.save({
        ...oldRef[0],
        ...updateRefreshTokenInput,
      });
    }
  }
  async removeByToken(token: string) {
    await this.refreshTokenRepository.delete({ token });
  }

  async removeByUserId(userId: number) {
    await this.refreshTokenRepository
      .createQueryBuilder('refreshToken')
      .leftJoinAndSelect('refreshToken.user', 'user')
      .where('user = :userId', { userId })
      .delete()
      .execute();
  }

  async remove(id: number) {
    await this.refreshTokenRepository.delete(id);
  }
}

import { Injectable } from '@nestjs/common';
import { CreateStatisticInput } from './dto/create-statistic.input';
import { UpdateStatisticInput } from './dto/update-statistic.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Statistic } from './entities/statistic.entity';
import { Repository } from 'typeorm';

@Injectable()
export class StatisticsService {
  constructor(
    @InjectRepository(Statistic)
    private statisticRepository: Repository<Statistic>,
  ) {}
  async create(createStatisticInput: CreateStatisticInput) {
    return await this.statisticRepository.save(createStatisticInput);
  }

  async findAll() {
    return await this.statisticRepository.find();
  }

  async findOne(id: number) {
    return await this.statisticRepository.findOneBy({ id });
  }

  async update(id: number, updateStatisticInput: UpdateStatisticInput) {
    const statistic = await this.statisticRepository.findOneBy({ id });

    return await this.statisticRepository.save({
      ...statistic,
      ...updateStatisticInput,
    });
  }
  async remove(id: number) {
    return await this.statisticRepository.delete(id);
  }
}

import { Module } from '@nestjs/common';
import { StatisticsService } from './statistics.service';
import { StatisticsResolver } from './statistics.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Statistic } from './entities/statistic.entity';
import { View } from './entities/view.entity';
import { Click } from './entities/click.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Statistic, View, Click])],
  providers: [StatisticsResolver, StatisticsService],
  exports: [TypeOrmModule],
})
export class StatisticsModule {}

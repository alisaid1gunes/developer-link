import { ObjectType, Field, Int } from '@nestjs/graphql';
import {
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { View } from './view.entity';
import { Click } from './click.entity';

@Entity()
@ObjectType()
export class Statistic {
  @Field(() => Int, { description: 'id of the statistic' })
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => [View], { description: 'views of the statistic' })
  @OneToMany(() => View, (view) => view.statistic)
  views: View[];

  @Field(() => [Click], { description: 'clicks of the statistic' })
  @OneToMany(() => Click, (click) => click.statistic)
  clicks: Click[];

  @Field(() => Date, { description: 'create date of the statistic' })
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => Date, { description: 'update date of the statistic' })
  @CreateDateColumn()
  updatedAt: Date;
}

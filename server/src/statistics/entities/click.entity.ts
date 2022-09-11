import { Field, Int, ObjectType } from '@nestjs/graphql';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Statistic } from './statistic.entity';

@ObjectType()
@Entity()
export class Click {
  @Field(() => Int, { description: 'id of the click' })
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => Date, { description: 'date of the click' })
  @Column()
  clickDate: Date;

  @ManyToOne(() => Statistic, (statistic) => statistic.clicks)
  statistic: Statistic;

  @Field(() => Date, { description: 'create date of the click' })
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => Date, { description: 'update date of the click' })
  @UpdateDateColumn()
  updatedAt: Date;
}

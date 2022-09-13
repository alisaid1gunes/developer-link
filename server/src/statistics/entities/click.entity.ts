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
import { ApiProperty } from '@nestjs/swagger';

@ObjectType()
@Entity()
export class Click {
  @ApiProperty()
  @Field(() => Int, { description: 'id of the click' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Field(() => Date, { description: 'date of the click' })
  @Column()
  clickDate: Date;

  @ApiProperty()
  @ManyToOne(() => Statistic, (statistic) => statistic.clicks)
  statistic: Statistic;

  @ApiProperty()
  @Field(() => Date, { description: 'create date of the click' })
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty()
  @Field(() => Date, { description: 'update date of the click' })
  @UpdateDateColumn()
  updatedAt: Date;
}

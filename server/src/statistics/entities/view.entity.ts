import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Link } from '../../links/entities/link.entity';
import { Statistic } from './statistic.entity';
import { ApiProperty } from '@nestjs/swagger';

@InputType('VI')
@ObjectType()
@Entity()
export class View {
  @Field(() => Int, { description: 'id of the view' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Field(() => Date, { description: 'date of the view' })
  @Column()
  date: Date;
  viewDate: Date;

  @ApiProperty()
  @Field(() => Link, { description: 'Statistic of the view' })
  @ManyToOne(() => Statistic, (statistic) => statistic.views)
  statistic: Statistic;

  @ApiProperty()
  @Field(() => Date, { description: 'create date of the view' })
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty()
  @Field(() => Date, { description: 'update date of the view' })
  @UpdateDateColumn()
  updatedAt: Date;
}

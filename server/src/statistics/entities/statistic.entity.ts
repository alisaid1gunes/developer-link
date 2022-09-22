import { ObjectType, Field, Int, InputType } from '@nestjs/graphql';
import {
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { View } from './view.entity';
import { Click } from './click.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
@InputType('ST')
@ObjectType()
export class Statistic {
  @ApiProperty()
  @Field(() => Int, { description: 'id of the statistic' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Field(() => [View], {
    description: 'views of the statistic',
    nullable: true,
  })
  @OneToMany(() => View, (view) => view.statistic)
  views?: View[];

  @ApiProperty()
  @Field(() => [Click], {
    description: 'clicks of the statistic',
    nullable: true,
  })
  @OneToMany(() => Click, (click) => click.statistic)
  clicks?: Click[];

  @ApiProperty()
  @Field(() => Date, { description: 'create date of the statistic' })
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty()
  @Field(() => Date, { description: 'update date of the statistic' })
  @CreateDateColumn()
  updatedAt: Date;
}

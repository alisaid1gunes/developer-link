import { ObjectType, Field, Int, InputType } from '@nestjs/graphql';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { ApiProperty } from '@nestjs/swagger';
import { Statistic } from '../../statistics/entities/statistic.entity';

@ObjectType()
@InputType('LIN')
@Entity()
export class Link {
  @ApiProperty()
  @Field(() => Int, { description: 'id of the link' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Field(() => String, { description: 'title of the link' })
  @Column()
  title: string;

  @ApiProperty()
  @Field(() => String, { description: 'url of the link' })
  @Column()
  url: string;

  @ApiProperty()
  @Field(() => Int, { description: 'order of the link' })
  @Column()
  order: number;

  @ApiProperty()
  @Field(() => Boolean, { description: 'activation status of the link' })
  @Column()
  active: boolean;

  @ApiProperty()
  @Field(() => String, { description: 'image url of the link', nullable: true })
  @Column()
  image?: string;

  @ApiProperty()
  @Field(() => User, { description: 'user of the link' })
  @ManyToOne(() => User, (user) => user.links)
  user: User;

  @ApiProperty()
  @Field(() => Statistic, { description: 'link statistic', nullable: true })
  @OneToOne(() => Statistic)
  @JoinColumn()
  statistic?: Statistic;

  @ApiProperty()
  @Field(() => Date, { description: 'create date of the link' })
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty()
  @Field(() => Date, { description: 'update date of the link' })
  @UpdateDateColumn()
  updatedAt: Date;
}

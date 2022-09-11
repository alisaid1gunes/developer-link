import { ObjectType, Field, Int } from '@nestjs/graphql';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { View } from '../../statistics/entities/view.entity';
@Entity()
@ObjectType()
export class Link {
  @Field(() => Int, { description: 'id of the link' })
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => String, { description: 'title of the link' })
  @Column()
  title: string;

  @Field(() => String, { description: 'url of the link' })
  @Column()
  url: string;

  @Field(() => Int, { description: 'order of the link' })
  @Column()
  order: number;

  @Field(() => Boolean, { description: 'activation status of the link' })
  @Column()
  active: boolean;

  @Field(() => String, { description: 'image url of the link' })
  @Column()
  image: string;

  @Field(() => User, { description: 'description of the link' })
  @ManyToOne(() => User, (user) => user.links)
  user: User;

  @Field(() => Date, { description: 'create date of the link' })
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => Date, { description: 'update date of the link' })
  @UpdateDateColumn()
  updatedAt: Date;
}

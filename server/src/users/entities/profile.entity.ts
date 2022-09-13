import {
  Column,
  CreateDateColumn,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Field, Int, ObjectType } from '@nestjs/graphql';
import { User } from './user.entity';

@Entity()
@ObjectType()
export class Profile {
  @Field(() => Int, { description: 'Id of the entity' })
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => String, { description: 'this is a url', nullable: true })
  @Column()
  photo?: string;

  @Field(() => String, { description: 'user biography', nullable: true })
  @Column()
  bio?: string;

  @Field(() => String, { description: 'user profile title', nullable: true })
  @Column()
  profileTitle?: string;

  @Field(() => Date, { description: 'user profile create date' })
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => Date, { description: 'user profile update date' })
  @UpdateDateColumn()
  updatedAt: Date;
}

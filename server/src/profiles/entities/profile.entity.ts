import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
@ObjectType()
@InputType('PR')
export class Profile {
  @ApiProperty()
  @Field(() => Int, { description: 'Id of the profile' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Field(() => String, {
    description: 'firstName of the user',
    nullable: true,
  })
  @Column()
  firstName?: string;

  @ApiProperty()
  @Field(() => String, {
    description: 'lastName of the user',
    nullable: true,
  })
  @Column()
  lastName?: string;

  @ApiProperty()
  @Field(() => String, { description: 'this is a url', nullable: true })
  @Column()
  photo?: string;

  @ApiProperty()
  @Field(() => String, { description: 'user biography', nullable: true })
  @Column()
  bio?: string;

  @ApiProperty()
  @Field(() => String, { description: 'user profile title', nullable: true })
  @Column()
  profileTitle?: string;

  @ApiProperty()
  @Field(() => Date, { description: 'user profile create date' })
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty()
  @Field(() => Date, { description: 'user profile update date' })
  @UpdateDateColumn()
  updatedAt: Date;
}

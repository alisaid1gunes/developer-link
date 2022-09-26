import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';
import { User } from '../../users/entities/user.entity';

@Entity()
@InputType('REF')
@ObjectType()
export class RefreshToken {
  @ApiProperty()
  @Field(() => Int, { description: 'Id of the entity' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Field(() => String, { description: 'token of the entity' })
  @Column()
  token: string;

  @OneToOne(() => User, (user) => user.refreshToken, {
    cascade: true,
  })
  @JoinColumn()
  user?: User;
}

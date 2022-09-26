import { Column } from 'typeorm';
import { Field, InputType } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';
import { User } from '../../users/entities/user.entity';

@InputType()
export class CreateRefreshtokenInput {
  @ApiProperty()
  @Field(() => String, { description: 'token' })
  @Column()
  token: string;

  @ApiProperty()
  @Field(() => User, { description: 'token' })
  @Column()
  user: User;
}

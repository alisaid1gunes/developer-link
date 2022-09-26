import { InputType, Field, Int } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

@InputType()
export class LogOutInput {
  @ApiProperty()
  @IsNumber()
  @Field(() => Int, { description: 'user id' })
  userId?: number;
}

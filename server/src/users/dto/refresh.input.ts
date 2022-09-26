import { InputType, Field, Int } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

@InputType()
export class RefreshInput {
  @ApiProperty()
  @IsNumber()
  @Field(() => Int, { description: 'user id' })
  userId?: number;

  @ApiProperty()
  @IsNumber()
  @Field(() => String, { description: 'user id' })
  token?: string;
}

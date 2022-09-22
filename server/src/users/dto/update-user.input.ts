import { InputType, Field } from '@nestjs/graphql';
import { IsEmail, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

@InputType()
export class UpdateUserInput {
  @ApiProperty()
  @MinLength(3)
  @Field(() => String, { description: 'username of the user', nullable: true })
  username?: string;

  @ApiProperty()
  @IsEmail()
  @Field(() => String, { description: 'email of the user', nullable: true })
  email?: string;
}

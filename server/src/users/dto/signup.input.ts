import { InputType, Field } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, MaxLength, MinLength } from 'class-validator';

@InputType()
export class SignUpInput {
  @ApiProperty()
  @MinLength(3)
  @MaxLength(20)
  @Field(() => String, { description: 'username of the entity' })
  username: string;

  @ApiProperty()
  @IsEmail()
  @Field(() => String, { description: 'Email of the entity' })
  email: string;

  @ApiProperty()
  @MinLength(10)
  @Field(() => String, { description: 'Password of the entity' })
  password: string;
}

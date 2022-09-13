import { InputType, Field } from '@nestjs/graphql';
import { Column } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, MinLength } from 'class-validator';
import { Profile } from '../entities/profile.entity';

@InputType()
export class CreateUserInput {
  @ApiProperty()
  @MinLength(3)
  @Field(() => String, { description: 'Name of the entity' })
  name: string;

  @ApiProperty()
  @IsEmail()
  @Field(() => String, { description: 'Email of the entity' })
  email: string;

  @ApiProperty()
  @MinLength(10)
  @Field(() => String, { description: 'Password of the entity' })
  password: string;

  @ApiProperty()
  @Field(() => Profile, { description: 'user profile', nullable: true })
  profile?: Profile;
}

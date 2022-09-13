import { InputType, Field, Int, PartialType } from '@nestjs/graphql';
import { Profile } from '../entities/profile.entity';
import { IsEmail, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

@InputType()
export class UpdateUserInput {
  @ApiProperty()
  @MinLength(3)
  @Field(() => String, { nullable: true })
  name?: string;

  @ApiProperty()
  @IsEmail()
  @Field(() => String, { nullable: true })
  email?: string;

  @ApiProperty()
  @Field(() => Profile, { nullable: true })
  profile?: Profile;
}

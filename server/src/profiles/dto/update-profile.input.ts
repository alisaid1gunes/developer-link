import { InputType, Field } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';
import { MinLength } from 'class-validator';

@InputType()
export class UpdateProfileInput {
  @ApiProperty()
  @MinLength(3)
  @Field(() => String, { description: 'firstName of the user', nullable: true })
  firstName?: string;

  @ApiProperty()
  @MinLength(3)
  @Field(() => String, { description: 'lastName of the user', nullable: true })
  lastName?: string;

  @ApiProperty()
  @Field(() => String, { description: 'profile photo', nullable: true })
  photo?: string;

  @ApiProperty()
  @Field(() => String, { description: 'user biography', nullable: true })
  bio?: string;

  @ApiProperty()
  @Field(() => String, { description: 'user profile title', nullable: true })
  profileTitle?: string;
}

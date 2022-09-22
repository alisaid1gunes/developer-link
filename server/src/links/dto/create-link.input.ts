import { InputType, Int, Field } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';
import { User } from '../../users/entities/user.entity';
import { IsBoolean, IsNumber, IsString, IsUrl } from 'class-validator';

@InputType()
export class CreateLinkInput {
  @IsString()
  @ApiProperty()
  @Field(() => String, { description: 'title of the link' })
  title: string;

  @IsUrl()
  @ApiProperty()
  @Field(() => String, { description: 'url of the link' })
  url: string;

  @IsNumber()
  @ApiProperty()
  @Field(() => Int, { description: 'order of the link' })
  order: number;

  @IsBoolean()
  @ApiProperty()
  @Field(() => Boolean, { description: 'activation status of the link' })
  active: boolean;

  @IsUrl()
  @ApiProperty()
  @Field(() => String, { description: 'image url of the link', nullable: true })
  image?: string;

  @ApiProperty()
  @Field(() => User, { description: 'user id of the link' })
  user: User;
}

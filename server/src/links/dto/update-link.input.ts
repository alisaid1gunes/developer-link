import { CreateLinkInput } from './create-link.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';
import { IsBoolean, IsNumber, IsString, IsUrl } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Column, ManyToOne } from 'typeorm';
import { User } from '../../users/entities/user.entity';

@InputType()
export class UpdateLinkInput extends PartialType(CreateLinkInput) {
  @IsString()
  @ApiProperty()
  @Field(() => String, { description: 'title of the link', nullable: true })
  title?: string;

  @IsUrl()
  @ApiProperty()
  @Field(() => String, { description: 'url of the link', nullable: true })
  url?: string;

  @IsNumber()
  @ApiProperty()
  @Field(() => Int, { description: 'order of the link', nullable: true })
  order?: number;

  @IsBoolean()
  @ApiProperty()
  @Field(() => Boolean, {
    description: 'activation status of the link',
    nullable: true,
  })
  active?: boolean;

  @IsUrl()
  @ApiProperty()
  @Field(() => String, { description: 'image url of the link', nullable: true })
  image?: string;
}

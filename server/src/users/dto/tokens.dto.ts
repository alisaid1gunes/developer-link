import { Field, ObjectType } from '@nestjs/graphql';
import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

@ObjectType()
export class TokensDto {
  @ApiProperty()
  @IsString()
  @Field(() => String, { nullable: false })
  accessToken: string;

  @ApiProperty()
  @IsString()
  @Field(() => String, { nullable: false })
  refreshToken: string;
}

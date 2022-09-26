import { InputType, Field } from '@nestjs/graphql';
import { IsEmail, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { RefreshToken } from '../../refreshtokens/entities/refreshtoken.entity';

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

  @ApiProperty()
  @IsString()
  @Field(() => RefreshToken, {
    description: 'refreshToken of the user',
    nullable: true,
  })
  refreshToken?: RefreshToken;
}

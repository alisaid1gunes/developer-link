import { InputType, Field } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';
import { FileUpload } from 'graphql-upload';
@InputType()
export class PhotoFileInput {
  @ApiProperty()
  @Field(() => String, { description: 'photo', nullable: true })
  image?: FileUpload;
}

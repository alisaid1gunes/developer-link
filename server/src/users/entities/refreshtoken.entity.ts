import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
@InputType('REF')
@ObjectType()
export class RefreshToken {
  @ApiProperty()
  @Field(() => Int, { description: 'Id of the entity' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Field(() => String, { description: 'token of the entity' })
  @Column()
  token: string;
}

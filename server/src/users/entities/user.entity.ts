import { ObjectType, Field, Int } from '@nestjs/graphql';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Profile } from './profile.entity';
import { RefreshToken } from './refreshtoken.entity';
import { Link } from '../../links/entities/link.entity';
import { ApiProperty } from '@nestjs/swagger';

@ObjectType()
@Entity()
export class User {
  @ApiProperty()
  @Field(() => Int, { description: 'Id of the entity' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Field(() => String, { description: 'Name of the entity' })
  @Column()
  name: string;

  @ApiProperty()
  @Field(() => String, { description: 'Email of the entity' })
  @Column()
  email: string;

  @ApiProperty()
  @Field(() => String, { description: 'Password of the entity' })
  @Column()
  password: string;

  @ApiProperty()
  @Field(() => Profile, { description: 'user profile', nullable: true })
  @OneToOne(() => Profile)
  @JoinColumn()
  profile?: Profile;

  @ApiProperty()
  @Field(() => RefreshToken, {
    description: 'user refresh token',
    nullable: true,
  })
  @ApiProperty()
  @OneToOne(() => RefreshToken)
  @JoinColumn()
  refreshToken?: RefreshToken;

  @ApiProperty()
  @Field(() => Link, { description: 'links of the user', nullable: true })
  @OneToMany(() => Link, (link) => link.user)
  links?: Link[];

  @ApiProperty()
  @Field(() => Date, { description: 'create date of the entity' })
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty()
  @Field(() => Date, { description: 'update date of the entity' })
  @UpdateDateColumn()
  updatedAt: Date;
}

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

@ObjectType()
@Entity()
export class User {
  @Field(() => Int, { description: 'Id of the entity' })
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => String, { description: 'Name of the entity' })
  @Column()
  name: string;

  @Field(() => String, { description: 'Email of the entity' })
  @Column()
  email: string;

  @Field(() => String, { description: 'Password of the entity' })
  @Column()
  password: string;

  @Field(() => Profile, { description: 'user profile' })
  @OneToOne(() => Profile)
  @JoinColumn()
  profile: Profile;

  @Field(() => RefreshToken, { description: 'user refresh token' })
  @OneToOne(() => RefreshToken)
  @JoinColumn()
  refreshToken: RefreshToken;

  @Field(() => Link, { description: 'links of the user' })
  @OneToMany(() => Link, (link) => link.user)
  links: Link[];

  @Field(() => Date, { description: 'create date of the entity' })
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => Date, { description: 'update date of the entity' })
  @UpdateDateColumn()
  updatedAt: Date;
}

import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersResolver } from './users.resolver';
import {TypeOrmModule} from "@nestjs/typeorm";
import {User} from "./entities/user.entity";
import {Profile} from "./entities/profile.entity";
import {RefreshToken} from "./entities/refreshtoken.entity";

@Module({
  imports: [TypeOrmModule.forFeature([User,Profile, RefreshToken])],
  providers: [UsersResolver, UsersService]
})
export class UsersModule {}

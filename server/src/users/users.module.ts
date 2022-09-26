import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersResolver } from './users.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { AuthModule } from '../auth/auth.module';
import { RefreshToken } from '../refreshtokens/entities/refreshtoken.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, RefreshToken]), AuthModule],
  providers: [UsersResolver, UsersService],
  exports: [TypeOrmModule, UsersService],
})
export class UsersModule {}

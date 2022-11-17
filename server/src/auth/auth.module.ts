import { forwardRef, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { AccessTokenStrategy } from './strategies/accessToken.strategy';
import { RefreshTokenStrategy } from './strategies/refreshToken.strategy';
import { UsersModule } from '../users/users.module';
import { RefreshtokensModule } from '../refreshtokens/refreshtokens.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity';
import { RefreshToken } from '../refreshtokens/entities/refreshtoken.entity';
import { RefreshTokensService } from '../refreshtokens/refreshtokens.service';

@Module({
  imports: [
    JwtModule.register({}),
    forwardRef(() => UsersModule),
    forwardRef(() => RefreshtokensModule),
    TypeOrmModule.forFeature([User, RefreshToken]),
  ],
  providers: [
    AuthService,
    AccessTokenStrategy,
    RefreshTokenStrategy,
    RefreshTokensService,
  ],
  exports: [AuthService],
})
export class AuthModule {}

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { RefreshToken } from './entities/refreshtoken.entity';
import { RefreshtokensResolver } from './refreshtokens.resolver';
import { RefreshTokensService } from './refreshtokens.service';

@Module({
  imports: [TypeOrmModule.forFeature([RefreshToken])],
  providers: [RefreshtokensResolver, RefreshTokensService],
  exports: [TypeOrmModule],
})
export class RefreshtokensModule {}

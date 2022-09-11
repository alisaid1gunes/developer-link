import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import configuration from '../config/configuration';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { UsersModule } from './users/users.module';
import { User } from './users/entities/user.entity';
import { Profile } from './users/entities/profile.entity';
import { RefreshToken } from './users/entities/refreshtoken.entity';
import { LinksModule } from './links/links.module';
import { Link } from './links/entities/link.entity';
import { StatisticsModule } from './statistics/statistics.module';
import { Statistic } from './statistics/entities/statistic.entity';
import { View } from './statistics/entities/view.entity';

@Module({
  imports: [
    UsersModule,
    ConfigModule.forRoot({ load: [configuration] }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: configuration().database.host,
      port: configuration().database.port,
      username: configuration().database.username,
      password: configuration().database.password,
      database: configuration().database.name,
      entities: [User, Profile, RefreshToken, Link, Statistic, View],
      synchronize: true,
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: 'schema.gql',
    }),
    LinksModule,
    StatisticsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

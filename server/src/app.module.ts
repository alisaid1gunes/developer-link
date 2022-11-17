import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import configuration from '../config/configuration';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { UsersModule } from './users/users.module';
import { User } from './users/entities/user.entity';
import { LinksModule } from './links/links.module';
import { Link } from './links/entities/link.entity';
import { StatisticsModule } from './statistics/statistics.module';
import { Statistic } from './statistics/entities/statistic.entity';
import { View } from './statistics/entities/view.entity';
import { Click } from './statistics/entities/click.entity';
import { CloudinaryModule } from './cloudinary/cloudinary.module';
import { ProfilesModule } from './profiles/profiles.module';
import { Profile } from './profiles/entities/profile.entity';
import { graphqlUploadExpress } from 'graphql-upload';
import { AuthModule } from './auth/auth.module';
import { RefreshToken } from './refreshtokens/entities/refreshtoken.entity';
import { RefreshtokensModule } from './refreshtokens/refreshtokens.module';

@Module({
  imports: [
    UsersModule,
    LinksModule,
    StatisticsModule,
    CloudinaryModule,
    ProfilesModule,
    AuthModule,
    RefreshtokensModule,
    ConfigModule.forRoot({ load: [configuration] }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: configuration().database.host,
      port: configuration().database.port,
      username: configuration().database.username,
      password: configuration().database.password,
      database: configuration().database.name,
      entities: [User, Profile, RefreshToken, Link, Statistic, View, Click],
      synchronize: true,
      ssl: true,
      extra: {
        ssl: {
          rejectUnauthorized: false,
        },
      },
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: 'schema.gql',
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(graphqlUploadExpress()).forRoutes('services');
  }
}

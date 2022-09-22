import { Module } from '@nestjs/common';
import { ProfilesService } from './profiles.service';
import { ProfilesResolver } from './profiles.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Profile } from './entities/profile.entity';
import { CloudinaryModule } from '../cloudinary/cloudinary.module';

@Module({
  imports: [CloudinaryModule, TypeOrmModule.forFeature([Profile])],
  providers: [ProfilesResolver, ProfilesService],
  exports: [TypeOrmModule],
})
export class ProfilesModule {}

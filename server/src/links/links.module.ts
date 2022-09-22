import { Module } from '@nestjs/common';
import { LinksService } from './links.service';
import { LinksResolver } from './links.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Link } from './entities/link.entity';
import { CloudinaryModule } from '../cloudinary/cloudinary.module';

@Module({
  imports: [CloudinaryModule, TypeOrmModule.forFeature([Link])],
  providers: [LinksResolver, LinksService],
  exports: [TypeOrmModule],
})
export class LinksModule {}

import { Injectable } from '@nestjs/common';
import { CreateProfileInput } from './dto/create-profile.input';
import { UpdateProfileInput } from './dto/update-profile.input';
import { CloudinaryService } from '../cloudinary/cloudinary.service';
import { Repository } from 'typeorm';
import { Profile } from './entities/profile.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { FileUpload } from 'graphql-upload';

@Injectable()
export class ProfilesService {
  constructor(
    private readonly cloudinaryService: CloudinaryService,
    @InjectRepository(Profile)
    private readonly profilesRepository: Repository<Profile>,
  ) {}
  async create(
    createProfileInput: CreateProfileInput,
    photoFileInput: FileUpload,
  ) {
    if (photoFileInput) {
      const { url } = await this.cloudinaryService.uploadImage(photoFileInput);
      createProfileInput.photo = url;
    }
    return await this.profilesRepository.save(createProfileInput);
  }

  async findAll() {
    return await this.profilesRepository.find();
  }

  async findOne(id: number) {
    return await this.profilesRepository.findOneBy({ id });
  }

  async update(
    id: number,
    updateProfileInput: UpdateProfileInput,
    photoFileInput: FileUpload,
  ) {
    const user = await this.profilesRepository.findOneBy({ id });
    if (user) {
      if (photoFileInput) {
        const { url } = await this.cloudinaryService.uploadImage(
          photoFileInput,
        );
        updateProfileInput.photo = url;
      }
      return await this.profilesRepository.save({
        ...user,
        ...updateProfileInput,
      });
    }
  }

  async remove(id: number) {
    return await this.profilesRepository.delete(id);
  }
}

import { Inject, Injectable } from '@nestjs/common';
import { CreateProfileInput } from './dto/create-profile.input';
import { UpdateProfileInput } from './dto/update-profile.input';
import { CloudinaryService } from '../cloudinary/cloudinary.service';
import { Repository } from 'typeorm';
import { Profile } from './entities/profile.entity';
import { PhotoFileInput } from './dto/photo-file.input';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ProfilesService {
  constructor(
    @Inject('Cloudinary')
    private readonly cloudinaryService: CloudinaryService,
    @InjectRepository(Profile)
    private readonly profilesRepository: Repository<Profile>,
  ) {}
  async create(
    createProfileInput: CreateProfileInput,
    photoFileInput: PhotoFileInput,
  ) {
    const { image } = photoFileInput;
    if (image) {
      const { url } = await this.cloudinaryService.uploadImage(image);
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
    photoFileInput: PhotoFileInput,
  ) {
    const user = await this.profilesRepository.findOneBy({ id });
    if (user) {
      const { image } = photoFileInput;
      if (image) {
        const { url } = await this.cloudinaryService.uploadImage(image);
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

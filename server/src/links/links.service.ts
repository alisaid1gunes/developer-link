import { Inject, Injectable } from '@nestjs/common';
import { CreateLinkInput } from './dto/create-link.input';
import { UpdateLinkInput } from './dto/update-link.input';
import { CloudinaryService } from '../cloudinary/cloudinary.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Link } from './entities/link.entity';
import { PhotoFileInput } from '../profiles/dto/photo-file.input';

@Injectable()
export class LinksService {
  constructor(
    @Inject('Cloudinary')
    private readonly cloudinaryService: CloudinaryService,
    @InjectRepository(Link)
    private readonly linkRepository: Repository<Link>,
  ) {}
  async create(
    createLinkInput: CreateLinkInput,
    photoFileInput: PhotoFileInput,
  ) {
    const { image } = photoFileInput;
    if (image) {
      const { url } = await this.cloudinaryService.uploadImage(image);
      createLinkInput.image = url;
    }
    return await this.linkRepository.save(createLinkInput);
  }

  async findAll() {
    return await this.linkRepository.find();
  }

  async findOne(id: number) {
    return await this.linkRepository.findOneBy({ id });
  }

  async update(
    id: number,
    updateLinkInput: UpdateLinkInput,
    photoFileInput: PhotoFileInput,
  ) {
    const link = await this.linkRepository.findOneBy({ id });
    if (link) {
      const { image } = photoFileInput;
      if (image) {
        const { url } = await this.cloudinaryService.uploadImage(image);
        updateLinkInput.image = url;
      }
      return await this.linkRepository.save({
        ...link,
        ...updateLinkInput,
      });
    }
  }

  async remove(id: number) {
    return await this.linkRepository.delete(id);
  }
}

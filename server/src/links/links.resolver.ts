import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { LinksService } from './links.service';
import { Link } from './entities/link.entity';
import { CreateLinkInput } from './dto/create-link.input';
import { UpdateLinkInput } from './dto/update-link.input';
import { PhotoFileInput } from '../profiles/dto/photo-file.input';

@Resolver(() => Link)
export class LinksResolver {
  constructor(private readonly linksService: LinksService) {}

  @Mutation(() => Link)
  createLink(
    @Args('createLinkInput') createLinkInput: CreateLinkInput,
    @Args('createLinkInput') photoFileInput: PhotoFileInput,
  ) {
    return this.linksService.create(createLinkInput, photoFileInput);
  }

  @Query(() => [Link], { name: 'links' })
  findAll() {
    return this.linksService.findAll();
  }

  @Query(() => Link, { name: 'link' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.linksService.findOne(id);
  }

  @Mutation(() => Link)
  updateLink(
    @Args('id', { type: () => Int }) id: number,
    @Args('updateLinkInput') updateLinkInput: UpdateLinkInput,
    @Args('photoFileInput') photoFileInput: PhotoFileInput,
  ) {
    return this.linksService.update(id, updateLinkInput, photoFileInput);
  }

  @Mutation(() => Link)
  removeLink(@Args('id', { type: () => Int }) id: number) {
    return this.linksService.remove(id);
  }
}

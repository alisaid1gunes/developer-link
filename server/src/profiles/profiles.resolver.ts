import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { ProfilesService } from './profiles.service';
import { Profile } from './entities/profile.entity';
import { CreateProfileInput } from './dto/create-profile.input';
import { UpdateProfileInput } from './dto/update-profile.input';
import { PhotoFileInput } from './dto/photo-file.input';

@Resolver(() => Profile)
export class ProfilesResolver {
  constructor(private readonly profilesService: ProfilesService) {}

  @Mutation(() => Profile)
  createProfile(
    @Args('createProfileInput') createProfileInput: CreateProfileInput,
    @Args('updateProfileInput') photoFileInput: PhotoFileInput,
  ) {
    return this.profilesService.create(createProfileInput, photoFileInput);
  }

  @Query(() => [Profile], { name: 'profiles' })
  findAll() {
    return this.profilesService.findAll();
  }

  @Query(() => Profile, { name: 'profile' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.profilesService.findOne(id);
  }

  @Mutation(() => Profile)
  updateProfile(
    @Args('id', { type: () => Int }) id: number,
    @Args('updateProfileInput') updateProfileInput: UpdateProfileInput,
    @Args('updateProfileInput') photoFileInput: PhotoFileInput,
  ) {
    return this.profilesService.update(id, updateProfileInput, photoFileInput);
  }

  @Mutation(() => Profile)
  removeProfile(@Args('id', { type: () => Int }) id: number) {
    return this.profilesService.remove(id);
  }
}
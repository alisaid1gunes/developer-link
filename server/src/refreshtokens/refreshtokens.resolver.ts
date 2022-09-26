import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';

import { CreateRefreshtokenInput } from './dto/create-refreshtoken.input';
import { RefreshToken } from './entities/refreshtoken.entity';
import { RefreshTokensService } from './refreshtokens.service';

@Resolver(() => RefreshToken)
export class RefreshtokensResolver {
  constructor(private readonly refreshtokensService: RefreshTokensService) {}

  @Mutation(() => RefreshToken)
  createRefreshtoken(
    @Args('createRefreshtokenInput')
    createRefreshtokenInput: CreateRefreshtokenInput,
  ) {
    return this.refreshtokensService.create(createRefreshtokenInput);
  }

  @Query(() => [RefreshToken], { name: 'refreshtokens' })
  findAll() {
    return this.refreshtokensService.findAll();
  }

  @Query(() => RefreshToken, { name: 'refreshtoken' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.refreshtokensService.findOne(id);
  }

  @Mutation(() => RefreshToken)
  removeRefreshtoken(@Args('id', { type: () => Int }) id: number) {
    return this.refreshtokensService.remove(id);
  }
}

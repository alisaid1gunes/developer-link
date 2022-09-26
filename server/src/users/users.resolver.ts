import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { UpdateUserInput } from './dto/update-user.input';
import { AuthService } from '../auth/auth.service';
import { LogInInput } from './dto/login.input';
import { LogOutInput } from './dto/logout.input';
import { RefreshInput } from './dto/refresh.input';
import { SignUpInput } from './dto/signup.input';
import { TokensDto } from './dto/tokens.dto';
import { UseGuards } from '@nestjs/common';
import { RefreshTokenGuard } from '../common/guards/refreshToken.guard';

@Resolver(() => User)
export class UsersResolver {
  constructor(
    private readonly usersService: UsersService,
    private readonly authService: AuthService,
  ) {}

  @Mutation(() => TokensDto)
  async signUp(@Args('signUpInput') signUpInput: SignUpInput) {
    return await this.authService.signUp(signUpInput);
  }

  @Mutation(() => TokensDto)
  async logIn(@Args('logInInput') logInInput: LogInInput) {
    return await this.authService.login(logInInput);
  }

  @Mutation(() => Boolean)
  async logOut(@Args('logOutInput') logOutInput: LogOutInput) {
    return await this.authService.logout(logOutInput);
  }

  @UseGuards(RefreshTokenGuard)
  @Mutation(() => TokensDto)
  async refresh(@Args('refreshInput') refreshInput: RefreshInput) {
    return await this.authService.refresh(refreshInput);
  }

  @Query(() => [User], { name: 'users' })
  findAll() {
    return this.usersService.findAll();
  }

  @Query(() => User, { name: 'user' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.usersService.findOne(id);
  }

  @Mutation(() => User)
  updateUser(
    @Args('id', { type: () => Int }) id: number,
    @Args('updateUserInput') updateUserInput: UpdateUserInput,
  ) {
    return this.usersService.update(id, updateUserInput);
  }

  @Mutation(() => User)
  removeUser(@Args('id', { type: () => Int }) id: number) {
    return this.usersService.remove(id);
  }
}

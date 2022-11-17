import {
  BadRequestException,
  ForbiddenException,
  forwardRef,
  Inject,
  Injectable,
} from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import * as argon2 from 'argon2';
import { JwtService } from '@nestjs/jwt';
import configuration from '../../config/configuration';
import { RefreshTokensService } from '../refreshtokens/refreshtokens.service';
import { SignUpInput } from '../users/dto/signup.input';
import { LogOutInput } from '../users/dto/logout.input';
import { RefreshInput } from '../users/dto/refresh.input';
import { LogInInput } from '../users/dto/login.input';
import { CreateRefreshtokenInput } from '../refreshtokens/dto/create-refreshtoken.input';
import { UpdateRefreshtokenInput } from '../refreshtokens/dto/update-refreshtoken.input';
@Injectable()
export class AuthService {
  constructor(
    @Inject(forwardRef(() => UsersService))
    private usersService: UsersService,
    @Inject(forwardRef(() => RefreshTokensService))
    private refreshTokensService: RefreshTokensService,
    private jwtService: JwtService,
  ) {}
  async signUp(createUserInput: SignUpInput): Promise<any> {
    const userExists = await this.usersService.findByUsername(
      createUserInput.username,
    );
    if (userExists) {
      throw new BadRequestException('User already exists');
    }

    // Hash password
    const hash = await this.hashData(createUserInput.password);
    const newUser = await this.usersService.create({
      ...createUserInput,
      password: hash,
    });
    const tokens = await this.getTokens(newUser.id, newUser.username);
    const hashedRefreshToken = await this.hashData(tokens.refreshToken);
    const createRefreshtokenInput = new CreateRefreshtokenInput();
    createRefreshtokenInput.token = hashedRefreshToken;
    createRefreshtokenInput.user = newUser;
    await this.refreshTokensService.create(createRefreshtokenInput);
    return tokens;
  }

  async login(data: LogInInput) {
    // Check if user exists
    const user = await this.usersService.findByUsername(data.username);
    if (!user) throw new BadRequestException('User does not exist');
    const passwordMatches = await argon2.verify(user.password, data.password);
    if (!passwordMatches)
      throw new BadRequestException('Password is incorrect');
    const tokens = await this.getTokens(user.id, user.username);
    await this.updateRefreshToken(user.id, tokens.refreshToken);
    return tokens;
  }

  async logout(logOutInput: LogOutInput) {
    await this.refreshTokensService.removeByUserId(logOutInput.userId);
    return true;
  }

  async refresh(refreshInput: RefreshInput) {
    const user = await this.usersService.findOneWithRefreshTokens(
      refreshInput.userId,
    );
    if (!user || !user.refreshToken)
      throw new ForbiddenException('Access Denied');
    const refreshTokenMatches = await argon2.verify(
      user.refreshToken.token,
      refreshInput.token,
    );
    if (!refreshTokenMatches) throw new ForbiddenException('Access Denied');
    const tokens = await this.getTokens(user.id, user.username);
    await this.updateRefreshToken(user.id, tokens.refreshToken);

    return tokens;
  }

  hashData(data: string) {
    return argon2.hash(data);
  }

  async getTokens(userId: number, username: string) {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(
        {
          sub: userId,
          username,
        },
        {
          secret: configuration().jwt.accessSecret,
          expiresIn: '15m',
        },
      ),
      this.jwtService.signAsync(
        {
          sub: userId,
          username,
        },
        {
          secret: configuration().jwt.refreshSecret,
          expiresIn: '7d',
        },
      ),
    ]);

    return {
      accessToken,
      refreshToken,
    };
  }

  async updateRefreshToken(userId: number, refreshToken: string) {
    const updateRefreshtokenInput = new UpdateRefreshtokenInput();
    const hashedRefreshToken = await this.hashData(refreshToken);
    updateRefreshtokenInput.token = hashedRefreshToken;
    await this.refreshTokensService.updateByUserId(
      userId,
      updateRefreshtokenInput,
    );
  }
}

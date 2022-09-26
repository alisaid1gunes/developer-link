import { Test, TestingModule } from '@nestjs/testing';
import { RefreshTokensService } from './refreshtokens.service';

describe('RefreshtokensService', () => {
  let service: RefreshTokensService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RefreshTokensService],
    }).compile();

    service = module.get<RefreshTokensService>(RefreshTokensService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

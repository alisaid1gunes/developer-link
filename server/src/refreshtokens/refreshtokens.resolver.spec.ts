import { Test, TestingModule } from '@nestjs/testing';
import { RefreshtokensResolver } from './refreshtokens.resolver';
import { RefreshtokensService } from './refreshtokens.service';

describe('RefreshtokensResolver', () => {
  let resolver: RefreshtokensResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RefreshtokensResolver, RefreshtokensService],
    }).compile();

    resolver = module.get<RefreshtokensResolver>(RefreshtokensResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});

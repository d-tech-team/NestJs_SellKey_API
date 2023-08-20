import { Test, TestingModule } from '@nestjs/testing';
import { RechargeHistoriesService } from './recharge_histories.service';

describe('RechargeHistoriesService', () => {
  let service: RechargeHistoriesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RechargeHistoriesService],
    }).compile();

    service = module.get<RechargeHistoriesService>(RechargeHistoriesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

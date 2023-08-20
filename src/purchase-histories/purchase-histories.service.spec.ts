import { Test, TestingModule } from '@nestjs/testing';
import { PurchaseHistoriesService } from './purchase-histories.service';

describe('PurchaseHistoriesService', () => {
  let service: PurchaseHistoriesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PurchaseHistoriesService],
    }).compile();

    service = module.get<PurchaseHistoriesService>(PurchaseHistoriesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

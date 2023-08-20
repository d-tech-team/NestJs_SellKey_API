import { Test, TestingModule } from '@nestjs/testing';
import { PurchaseHistoriesController } from './purchase-histories.controller';
import { PurchaseHistoriesService } from './purchase-histories.service';

describe('PurchaseHistoriesController', () => {
  let controller: PurchaseHistoriesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PurchaseHistoriesController],
      providers: [PurchaseHistoriesService],
    }).compile();

    controller = module.get<PurchaseHistoriesController>(PurchaseHistoriesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

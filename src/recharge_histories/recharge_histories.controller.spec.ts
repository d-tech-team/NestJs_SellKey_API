import { Test, TestingModule } from '@nestjs/testing';
import { RechargeHistoriesController } from './recharge_histories.controller';
import { RechargeHistoriesService } from './recharge_histories.service';

describe('RechargeHistoriesController', () => {
  let controller: RechargeHistoriesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RechargeHistoriesController],
      providers: [RechargeHistoriesService],
    }).compile();

    controller = module.get<RechargeHistoriesController>(RechargeHistoriesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

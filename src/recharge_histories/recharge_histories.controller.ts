import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RechargeHistoriesService } from './recharge_histories.service';
import { CreateRechargeHistoryDto } from './dto/create-recharge_history.dto';
import { UpdateRechargeHistoryDto } from './dto/update-recharge_history.dto';

@Controller('recharge-histories')
export class RechargeHistoriesController {
  constructor(private readonly rechargeHistoriesService: RechargeHistoriesService) {}

  @Post()
  create(@Body() createRechargeHistoryDto: CreateRechargeHistoryDto) {
    return this.rechargeHistoriesService.create(createRechargeHistoryDto);
  }

  @Get()
  findAll() {
    return this.rechargeHistoriesService.findAll();
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.rechargeHistoriesService.delete(id);
  }
}

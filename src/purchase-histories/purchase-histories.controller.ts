import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { PurchaseHistoriesService } from './purchase-histories.service';
import { BuyDto, CreatePurchaseHistoryDto } from './dto/create-purchase-history.dto';
import { UpdatePurchaseHistoryDto } from './dto/update-purchase-history.dto';

@Controller('purchase-histories')
export class PurchaseHistoriesController {
  constructor(private readonly purchaseHistoriesService: PurchaseHistoriesService) { }


  @Get('key-special')
  findAllKeySpecial() {

  }

  @Post('key-special')
  createKeySpecial() {

  }

  @Get()
  findAll(@Request() req: any) {
    return this.purchaseHistoriesService.findAll(req?.user);
  }

  @Post()
  create(@Body() body: BuyDto, @Request() req: any) {
    return this.purchaseHistoriesService.buy(body, req?.user);
  }

  @Patch(':id')
  updateCharactername(@Param('id') id: string, @Body() body: UpdatePurchaseHistoryDto, @Request() req: any) {
    return this.purchaseHistoriesService.updateChartername(id, body?.name, req?.user);
  }
}

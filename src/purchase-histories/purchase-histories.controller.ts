import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PurchaseHistoriesService } from './purchase-histories.service';
import { CreatePurchaseHistoryDto } from './dto/create-purchase-history.dto';
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
  findAll() {

  }

  @Post()
  create() {

  }
}

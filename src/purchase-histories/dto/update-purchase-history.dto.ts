import { PartialType } from '@nestjs/mapped-types';
import { BuyDto, CreatePurchaseHistoryDto } from './create-purchase-history.dto';

export class UpdatePurchaseHistoryDto extends PartialType(BuyDto) {}

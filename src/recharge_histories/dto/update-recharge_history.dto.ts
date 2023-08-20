import { PartialType } from '@nestjs/mapped-types';
import { CreateRechargeHistoryDto } from './create-recharge_history.dto';

export class UpdateRechargeHistoryDto extends PartialType(CreateRechargeHistoryDto) {}

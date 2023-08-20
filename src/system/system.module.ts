import { Module } from '@nestjs/common';
import { SystemService } from './system.service';
import { SystemController } from './system.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { System } from './system.model';

@Module({
  imports:[SequelizeModule.forFeature([System])],
  controllers: [SystemController],
  providers: [SystemService]
})
export class SystemModule {}

import { Module } from '@nestjs/common';
import { ServersService } from './servers.service';
import { ServersController } from './servers.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Servers } from './servers.model';

@Module({
  imports: [SequelizeModule.forFeature([Servers])],
  controllers: [ServersController],
  providers: [ServersService]
})
export class ServersModule { }

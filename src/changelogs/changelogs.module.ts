import { Module } from '@nestjs/common';
import { ChangelogsService } from './changelogs.service';
import { ChangelogsController } from './changelogs.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { ChangeLogs } from './changelogs.model';

@Module({
  imports: [SequelizeModule.forFeature([ChangeLogs])],
  controllers: [ChangelogsController],
  providers: [ChangelogsService]
})
export class ChangelogsModule { }

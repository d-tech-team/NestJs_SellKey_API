import { Injectable } from '@nestjs/common';
import { CreateServerDto } from './dto/create-server.dto';
import { UpdateServerDto } from './dto/update-server.dto';
import { Servers } from './servers.model';
import { InjectModel } from '@nestjs/sequelize';
import { BaseService } from 'src/common/base/base.service';
import { Sequelize } from 'sequelize-typescript';

@Injectable()
export class ServersService extends BaseService<Servers> {
  constructor(@InjectModel(Servers) private serverModel: typeof Servers,
    sequelize: Sequelize
  ) {
    super(serverModel, sequelize);
  }

  remove(id: number) {
    return `This action removes a #${id} server`;
  }
}

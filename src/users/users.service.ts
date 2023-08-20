import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Users } from './users.model';
import { Sequelize } from 'sequelize-typescript';
import { BaseService } from 'src/common/base/base.service';

@Injectable()
export class UsersService extends BaseService<Users> {
  constructor(@InjectModel(Users) private userModel: typeof Users,
    sequelize: Sequelize
  ) {
    super(userModel, sequelize);
  }

  findByUsername(username: string): Promise<Users | any> {
    return this.userModel.findOne({
      where: {
        email: username,
        isDeleted: 0,
      },
    });
  }

  create({ ...data }): Promise<Users> {
    return this.userModel.create(data);
  }
}

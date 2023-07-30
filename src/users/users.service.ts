import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Users } from './users.model';

@Injectable()
export class UsersService {
  constructor(@InjectModel(Users) private userModel: typeof Users) {}

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

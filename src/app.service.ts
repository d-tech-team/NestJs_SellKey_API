import { InjectModel } from '@nestjs/sequelize';
import { Model, ModelCtor } from 'sequelize';

export class AppService<T extends Model> {
  constructor(private readonly model: ModelCtor<T>) {

  }

  async findOne(id: string, condition: object = {}, include: any[] = []): Promise<T | null> {
    return await this.model.findOne({ where: { id, ...condition }, include });
  }
}

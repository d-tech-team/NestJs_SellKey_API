import { BeforeCreate, Column, Model, Table } from 'sequelize-typescript';
import { v4 as uuidv4 } from 'uuid';



@Table
export class Images extends Model {

    @Column({
        primaryKey: true,
    })
    id: string;

    @Column
    url: string

    @Column
    public_id: string

    @Column({
        defaultValue: 0,
    })
    isDeleted: number;

    @Column({
        defaultValue: Date.now(),
    })
    createdAt: Date;

    @Column({
        defaultValue: Date.now(),
    })
    updatedAt: Date;

    @BeforeCreate
    static createId(instance: Images) {
    instance.id = uuidv4();
  } 

}
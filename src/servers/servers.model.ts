import { BeforeCreate, Column, Model, Table } from "sequelize-typescript"
import { v4 as uuidv4 } from 'uuid';


@Table
export class Servers extends Model {

    @Column({
        primaryKey: true,
    })
    id: string;

    @Column
    name: string

    @Column
    code: string

    @Column
    location: string

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
    static createId(instance: Servers) {
        instance.id = uuidv4();
    }
}
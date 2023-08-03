import { Model } from "sequelize";
import { Column } from 'sequelize-typescript';



export class Images extends Model {

    @Column
    url: string

    @Column
    public_id: string
}
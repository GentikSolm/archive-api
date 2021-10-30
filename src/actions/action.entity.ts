import { Table, Column, Model } from 'sequelize-typescript'
import { DataTypes } from 'sequelize/types'

@Table
export class Action extends Model<Action> {
    @Column({
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
    })
    action_id: number

    @Column({
        type: DataTypes.STRING,
        allowNull: false
    })
    action_name: string
}
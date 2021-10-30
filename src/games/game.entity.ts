import {Table, Column, Model, DataType} from 'sequelize-typescript'
import { DataTypes } from 'sequelize/types'

@Table
export class Game extends Model<Game> {
    @Column({
        type: DataType.STRING,
        allowNull: false,
        primaryKey: true,
        references: {
            model: 'users',
            key: 'user_id'
        }
    })
    user_id: string

    @Column({
        type: DataType.STRING(45),
        allowNull: false,
        primaryKey: true
    })
    game_name: string
}
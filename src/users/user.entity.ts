import {Table, Column, Model, DataType} from 'sequelize-typescript'
import { DataTypes } from 'sequelize/types'

@Table
export class User extends Model<User> {
    @Column({
        type: DataType.STRING,
        allowNull: false,
        primaryKey: true
    })
    user_id: string

    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    rep: number

    @Column({
        type: DataType.INTEGER,
        allowNull: false,
        defaultValue: 0
    }) 
    total_trans: number

    @Column({
        type: DataTypes.TINYINT,
        allowNull: false,
        defaultValue: 0
    }) 
    mention_flag: number

    @Column({
        type: DataType.STRING,
        allowNull: true
    })
    twitch_id: string

    @Column({
        type: DataType.STRING,
        allowNull: true
    })
    bio: string
}
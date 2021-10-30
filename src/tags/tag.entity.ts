import { Table, Column, Model } from 'sequelize-typescript'
import { DataTypes } from 'sequelize/types'

@Table
export class Tag extends Model<Tag> {
    @Column({
        type: DataTypes.STRING(45),
        allowNull: false,
        primaryKey: true,
        references: {
            model: 'users',
            key: 'user_id'
        }
    })
    user_id: string

    @Column({
        type: DataTypes.STRING(20),
        allowNull: false,
        primaryKey: true
    })
    tag_name: string

    @Column({
        type: DataTypes.STRING(20),
        allowNull: false
    })
    platform: string
}
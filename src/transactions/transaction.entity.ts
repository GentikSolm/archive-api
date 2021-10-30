import { Table, Column, Model } from 'sequelize-typescript'
import { DataTypes } from 'sequelize/types'

@Table
export class Transaction extends Model<Transaction> {
    @Column({
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
    })
    transaction_id: number

    @Column({
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'actions',
            key: 'action_id'
        }
    })
    action_id: number

    @Column({
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'users',
            key: 'user_id'
        }
    })
    sender: number

    @Column({
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'users',
            key: 'user_id'
        }
    })
    receiver: number

    @Column({
        type: DataTypes.DATE,
        allowNull: false
    })
    time: Date

    @Column({
        type: DataTypes.INTEGER,
        allowNull: false
    })
    setrep_param: number
}

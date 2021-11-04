import * as Sequelize from 'sequelize'
import { DataTypes, Model, Optional } from 'sequelize'
import type { actions, actionsId } from './actions'
import type { users, usersId } from './users'

export type transactionsAttributes = {
  transaction_id: number;
  action_id: number;
  sender: string;
  receiver: string;
  time: Date;
  setrep_param?: number;
}

export type transactionsPk = 'transaction_id';
export type transactionsId = transactions[transactionsPk];
export type transactionsOptionalAttributes = 'transaction_id' | 'setrep_param';
export type transactionsCreationAttributes = Optional<transactionsAttributes, transactionsOptionalAttributes>;

export class transactions extends Model<transactionsAttributes, transactionsCreationAttributes> implements transactionsAttributes {
  transaction_id!: number;
  action_id!: number;
  sender!: string;
  receiver!: string;
  time!: Date;
  setrep_param?: number;

  // transactions belongsTo actions via action_id
  action!: actions;
  getAction!: Sequelize.BelongsToGetAssociationMixin<actions>;
  setAction!: Sequelize.BelongsToSetAssociationMixin<actions, actionsId>;
  createAction!: Sequelize.BelongsToCreateAssociationMixin<actions>;
  // transactions belongsTo users via receiver
  receiver_user!: users;
  getReceiver_user!: Sequelize.BelongsToGetAssociationMixin<users>;
  setReceiver_user!: Sequelize.BelongsToSetAssociationMixin<users, usersId>;
  createReceiver_user!: Sequelize.BelongsToCreateAssociationMixin<users>;
  // transactions belongsTo users via sender
  sender_user!: users;
  getSender_user!: Sequelize.BelongsToGetAssociationMixin<users>;
  setSender_user!: Sequelize.BelongsToSetAssociationMixin<users, usersId>;
  createSender_user!: Sequelize.BelongsToCreateAssociationMixin<users>;

  static initModel (sequelize: Sequelize.Sequelize): typeof transactions {
    transactions.init({
      transaction_id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
      },
      action_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'actions',
          key: 'action_id'
        }
      },
      sender: {
        type: DataTypes.STRING(45),
        allowNull: false,
        references: {
          model: 'users',
          key: 'user_id'
        }
      },
      receiver: {
        type: DataTypes.STRING(45),
        allowNull: false,
        references: {
          model: 'users',
          key: 'user_id'
        }
      },
      time: {
        type: DataTypes.DATE,
        allowNull: false
      },
      setrep_param: {
        type: DataTypes.INTEGER,
        allowNull: true
      }
    }, {
      sequelize,
      tableName: 'transactions',
      timestamps: false,
      indexes: [
        {
          name: 'PRIMARY',
          unique: true,
          using: 'BTREE',
          fields: [
            { name: 'transaction_id' }
          ]
        },
        {
          name: 'user_id_idx',
          using: 'BTREE',
          fields: [
            { name: 'sender' },
            { name: 'receiver' }
          ]
        },
        {
          name: 'receiver_idx',
          using: 'BTREE',
          fields: [
            { name: 'receiver' }
          ]
        },
        {
          name: 'FK_action_actions_idx',
          using: 'BTREE',
          fields: [
            { name: 'action_id' }
          ]
        }
      ]
    })
    return transactions
  }
}

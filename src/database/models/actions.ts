import * as Sequelize from 'sequelize'
import { DataTypes, Model, Optional } from 'sequelize'
import type { transactions, transactionsId } from './transactions'

export type actionsAttributes = {
  action_id: number;
  action_name?: string;
}

export type actionsPk = 'action_id';
export type actionsId = actions[actionsPk];
export type actionsOptionalAttributes = 'action_id' | 'action_name';
export type actionsCreationAttributes = Optional<actionsAttributes, actionsOptionalAttributes>;

export class actions extends Model<actionsAttributes, actionsCreationAttributes> implements actionsAttributes {
  action_id!: number;
  action_name?: string;

  // actions hasMany transactions via action_id
  transactions!: transactions[];
  getTransactions!: Sequelize.HasManyGetAssociationsMixin<transactions>;
  setTransactions!: Sequelize.HasManySetAssociationsMixin<transactions, transactionsId>;
  addTransaction!: Sequelize.HasManyAddAssociationMixin<transactions, transactionsId>;
  addTransactions!: Sequelize.HasManyAddAssociationsMixin<transactions, transactionsId>;
  createTransaction!: Sequelize.HasManyCreateAssociationMixin<transactions>;
  removeTransaction!: Sequelize.HasManyRemoveAssociationMixin<transactions, transactionsId>;
  removeTransactions!: Sequelize.HasManyRemoveAssociationsMixin<transactions, transactionsId>;
  hasTransaction!: Sequelize.HasManyHasAssociationMixin<transactions, transactionsId>;
  hasTransactions!: Sequelize.HasManyHasAssociationsMixin<transactions, transactionsId>;
  countTransactions!: Sequelize.HasManyCountAssociationsMixin;

  static initModel (sequelize: Sequelize.Sequelize): typeof actions {
    actions.init({
      action_id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
      },
      action_name: {
        type: DataTypes.STRING(45),
        allowNull: true
      }
    }, {
      sequelize,
      tableName: 'actions',
      timestamps: false,
      indexes: [
        {
          name: 'PRIMARY',
          unique: true,
          using: 'BTREE',
          fields: [
            { name: 'action_id' }
          ]
        }
      ]
    })
    return actions
  }
}

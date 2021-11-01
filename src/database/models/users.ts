import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { games, gamesId } from './games';
import type { tags, tagsId } from './tags';
import type { transactions, transactionsId } from './transactions';

export interface usersAttributes {
  user_id: string;
  rep: number;
  total_trans: number;
  mention_flag: number;
  twitch_id?: string;
  bio?: string;
}

export type usersPk = "user_id";
export type usersId = users[usersPk];
export type usersOptionalAttributes = "user_id" | "total_trans" | "mention_flag" | "twitch_id" | "bio";
export type usersCreationAttributes = Optional<usersAttributes, usersOptionalAttributes>;

export class users extends Model<usersAttributes, usersCreationAttributes> implements usersAttributes {
  user_id!: string;
  rep!: number;
  total_trans!: number;
  mention_flag!: number;
  twitch_id?: string;
  bio?: string;

  // users hasMany games via user_id
  games!: games[];
  getGames!: Sequelize.HasManyGetAssociationsMixin<games>;
  setGames!: Sequelize.HasManySetAssociationsMixin<games, gamesId>;
  addGame!: Sequelize.HasManyAddAssociationMixin<games, gamesId>;
  addGames!: Sequelize.HasManyAddAssociationsMixin<games, gamesId>;
  createGame!: Sequelize.HasManyCreateAssociationMixin<games>;
  removeGame!: Sequelize.HasManyRemoveAssociationMixin<games, gamesId>;
  removeGames!: Sequelize.HasManyRemoveAssociationsMixin<games, gamesId>;
  hasGame!: Sequelize.HasManyHasAssociationMixin<games, gamesId>;
  hasGames!: Sequelize.HasManyHasAssociationsMixin<games, gamesId>;
  countGames!: Sequelize.HasManyCountAssociationsMixin;
  // users hasMany tags via user_id
  tags!: tags[];
  getTags!: Sequelize.HasManyGetAssociationsMixin<tags>;
  setTags!: Sequelize.HasManySetAssociationsMixin<tags, tagsId>;
  addTag!: Sequelize.HasManyAddAssociationMixin<tags, tagsId>;
  addTags!: Sequelize.HasManyAddAssociationsMixin<tags, tagsId>;
  createTag!: Sequelize.HasManyCreateAssociationMixin<tags>;
  removeTag!: Sequelize.HasManyRemoveAssociationMixin<tags, tagsId>;
  removeTags!: Sequelize.HasManyRemoveAssociationsMixin<tags, tagsId>;
  hasTag!: Sequelize.HasManyHasAssociationMixin<tags, tagsId>;
  hasTags!: Sequelize.HasManyHasAssociationsMixin<tags, tagsId>;
  countTags!: Sequelize.HasManyCountAssociationsMixin;
  // users hasMany transactions via receiver
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
  // users hasMany transactions via sender
  sender_transactions!: transactions[];
  getSender_transactions!: Sequelize.HasManyGetAssociationsMixin<transactions>;
  setSender_transactions!: Sequelize.HasManySetAssociationsMixin<transactions, transactionsId>;
  addSender_transaction!: Sequelize.HasManyAddAssociationMixin<transactions, transactionsId>;
  addSender_transactions!: Sequelize.HasManyAddAssociationsMixin<transactions, transactionsId>;
  createSender_transaction!: Sequelize.HasManyCreateAssociationMixin<transactions>;
  removeSender_transaction!: Sequelize.HasManyRemoveAssociationMixin<transactions, transactionsId>;
  removeSender_transactions!: Sequelize.HasManyRemoveAssociationsMixin<transactions, transactionsId>;
  hasSender_transaction!: Sequelize.HasManyHasAssociationMixin<transactions, transactionsId>;
  hasSender_transactions!: Sequelize.HasManyHasAssociationsMixin<transactions, transactionsId>;
  countSender_transactions!: Sequelize.HasManyCountAssociationsMixin;

  static initModel(sequelize: Sequelize.Sequelize): typeof users {
    users.init({
    user_id: {
      type: DataTypes.STRING(45),
      allowNull: false,
      primaryKey: true
    },
    rep: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    total_trans: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    mention_flag: {
      type: DataTypes.TINYINT,
      allowNull: false,
      defaultValue: 0
    },
    twitch_id: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    bio: {
      type: DataTypes.STRING(512),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'users',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "user_id" },
        ]
      },
    ]
  });
  return users;
  }
}

import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { users, usersId } from './users';

export interface gamesAttributes {
  user_id: string;
  game_name: string;
}

export type gamesPk = "user_id" | "game_name";
export type gamesId = games[gamesPk];
export type gamesOptionalAttributes = "user_id" | "game_name";
export type gamesCreationAttributes = Optional<gamesAttributes, gamesOptionalAttributes>;

export class games extends Model<gamesAttributes, gamesCreationAttributes> implements gamesAttributes {
  user_id!: string;
  game_name!: string;

  // games belongsTo users via user_id
  user!: users;
  getUser!: Sequelize.BelongsToGetAssociationMixin<users>;
  setUser!: Sequelize.BelongsToSetAssociationMixin<users, usersId>;
  createUser!: Sequelize.BelongsToCreateAssociationMixin<users>;

  static initModel(sequelize: Sequelize.Sequelize): typeof games {
    games.init({
    user_id: {
      type: DataTypes.STRING(45),
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'users',
        key: 'user_id'
      }
    },
    game_name: {
      type: DataTypes.STRING(45),
      allowNull: false,
      primaryKey: true
    }
  }, {
    sequelize,
    tableName: 'games',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "user_id" },
          { name: "game_name" },
        ]
      },
    ]
  });
  return games;
  }
}

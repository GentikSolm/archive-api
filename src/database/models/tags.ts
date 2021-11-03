import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { users, usersId } from './users';

export interface tagsAttributes {
  user_id: string;
  tag_name: string;
  platform: string;
}

export type tagsPk = "user_id" | "tag_name";
export type tagsId = tags[tagsPk];
export type tagsOptionalAttributes = "user_id" | "tag_name";
export type tagsCreationAttributes = Optional<tagsAttributes, tagsOptionalAttributes>;

export class tags extends Model<tagsAttributes, tagsCreationAttributes> implements tagsAttributes {
  user_id!: string;
  tag_name!: string;
  platform!: string;

  // tags belongsTo users via user_id
  user!: users;
  getUser!: Sequelize.BelongsToGetAssociationMixin<users>;
  setUser!: Sequelize.BelongsToSetAssociationMixin<users, usersId>;
  createUser!: Sequelize.BelongsToCreateAssociationMixin<users>;

  static initModel(sequelize: Sequelize.Sequelize): typeof tags {
    tags.init({
    user_id: {
      type: DataTypes.STRING(45),
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'users',
        key: 'user_id'
      }
    },
    tag_name: {
      type: DataTypes.STRING(20),
      allowNull: false,
      primaryKey: true
    },
    platform: {
      type: DataTypes.STRING(20),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'tags',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "user_id" },
          { name: "tag_name" },
        ]
      },
    ]
  });
  return tags;
  }
}

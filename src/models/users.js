const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('users', {
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
};

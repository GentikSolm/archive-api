const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('transactions', {
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
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "transaction_id" },
        ]
      },
      {
        name: "user_id_idx",
        using: "BTREE",
        fields: [
          { name: "sender" },
          { name: "receiver" },
        ]
      },
      {
        name: "receiver_idx",
        using: "BTREE",
        fields: [
          { name: "receiver" },
        ]
      },
      {
        name: "FK_action_actions_idx",
        using: "BTREE",
        fields: [
          { name: "action_id" },
        ]
      },
    ]
  });
};

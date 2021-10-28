var DataTypes = require("sequelize").DataTypes;
var _actions = require("./actions");
var _games = require("./games");
var _tags = require("./tags");
var _transactions = require("./transactions");
var _users = require("./users");

function initModels(sequelize) {
  var actions = _actions(sequelize, DataTypes);
  var games = _games(sequelize, DataTypes);
  var tags = _tags(sequelize, DataTypes);
  var transactions = _transactions(sequelize, DataTypes);
  var users = _users(sequelize, DataTypes);

  transactions.belongsTo(actions, { as: "action", foreignKey: "action_id"});
  actions.hasMany(transactions, { as: "transactions", foreignKey: "action_id"});
  games.belongsTo(users, { as: "user", foreignKey: "user_id"});
  users.hasMany(games, { as: "games", foreignKey: "user_id"});
  tags.belongsTo(users, { as: "user", foreignKey: "user_id"});
  users.hasMany(tags, { as: "tags", foreignKey: "user_id"});
  transactions.belongsTo(users, { as: "receiver_user", foreignKey: "receiver"});
  users.hasMany(transactions, { as: "transactions", foreignKey: "receiver"});
  transactions.belongsTo(users, { as: "sender_user", foreignKey: "sender"});
  users.hasMany(transactions, { as: "sender_transactions", foreignKey: "sender"});

  return {
    actions,
    games,
    tags,
    transactions,
    users,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;

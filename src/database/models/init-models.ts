import type { Sequelize } from "sequelize";
import { actions } from "./actions";
import type { actionsAttributes, actionsCreationAttributes } from "./actions";
import { games } from "./games";
import type { gamesAttributes, gamesCreationAttributes } from "./games";
import { tags } from "./tags";
import type { tagsAttributes, tagsCreationAttributes } from "./tags";
import { transactions } from "./transactions";
import type { transactionsAttributes, transactionsCreationAttributes } from "./transactions";
import { users } from "./users";
import type { usersAttributes, usersCreationAttributes } from "./users";

export {
  actions,
  games,
  tags,
  transactions,
  users,
};

export type {
  actionsAttributes,
  actionsCreationAttributes,
  gamesAttributes,
  gamesCreationAttributes,
  tagsAttributes,
  tagsCreationAttributes,
  transactionsAttributes,
  transactionsCreationAttributes,
  usersAttributes,
  usersCreationAttributes,
};

export function initModels(sequelize: Sequelize) {
  actions.initModel(sequelize);
  games.initModel(sequelize);
  tags.initModel(sequelize);
  transactions.initModel(sequelize);
  users.initModel(sequelize);

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
    actions: actions,
    games: games,
    tags: tags,
    transactions: transactions,
    users: users,
  };
}

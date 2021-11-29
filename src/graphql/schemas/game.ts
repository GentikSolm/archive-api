export default `
  type Game {
    user_id: ID!
    game_name: String!
  }

  extend type Query {
    games(user_id: ID!): [Game]
  }

  extend type Mutation {
    addGame(user_id: ID!, name: String!): Game
    editGame(user_id: ID!, name: String!): Game
    deleteGame(user_id: ID!, name: String!): Game
    modifyGames(user_id: ID!, names: [String!]): [Game!]
  }
`
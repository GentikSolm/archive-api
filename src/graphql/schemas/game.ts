export default `
  type Game {
    user_id: ID!
    game_name: String!
  }

  extend type Query {
    games(user_id: ID!): [Game]
  }
`
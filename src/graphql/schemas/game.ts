import { gql } from 'apollo-server-express'

export const gameSchema = `
  type Game {
    user_id: ID!
    game_name: String!
  }

  extend type Query {
    games(user_id: ID!): [Game]
  }
`

export default gql`${gameSchema}`
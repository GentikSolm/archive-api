import { gql } from 'apollo-server-express'

export const userSchema = `
  type User {
      user_id: ID!
      rep: Int!
      total_trans: Int!
      mention_flag: Boolean!
      twitch_id: String
      bio: String
  }

  type Session {
    user_id: ID!
    token: String!
    expiration: Int! 
  }

  extend type Query {
    users: [User!]
    user(user_id: ID!): User
    login(user_id: ID!): Session
  }
`

export default gql`${userSchema}`

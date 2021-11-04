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

    extend type Query {
      users: [User!]
      user(user_id: ID!): User
    }
`

export default gql`${userSchema}`

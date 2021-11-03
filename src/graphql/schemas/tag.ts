import { gql } from "apollo-server-core";

export const tagSchema = `
  type Tag {
    user_id: ID!
    tag_name: String!
    platform: String!
  }

  extend type Query {
    tags(user_id: ID!): [Tag!]
  }
`

export default gql`${tagSchema}`
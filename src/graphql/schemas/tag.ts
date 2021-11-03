import { gql } from "apollo-server-core";

export default gql`
  type Tag {
    user_id: ID!
    tag_name: String!
    platform: String!
  }

  extend type Query {
    tags(user_id: ID!): [Tag!]
  }
`
export default `
  type Tag {
    user_id: ID!
    tag_name: String!
    platform: String!
  }

  extend type Query {
    tags(user_id: ID!): [Tag!]
  }
`
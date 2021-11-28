export default `
  type User {
      user_id: ID!
      rep: Int!
      total_trans: Int!
      mention_flag: Boolean!
      username: String
      bio: String
      avatar: String
  }

  type Session {
    user_id: ID!
    token: String!
    expiration: Float! 
  }

  extend type Query {
    users: [User!]
    user(user_id: ID!): User
    login(user_id: ID!): Session
    pagedusers(page: Int, limit: Int): [User!]
  }

  extend type Mutation {
    curse(sender: ID!, receiver: ID!): User
    thank(sender: ID!, receiver: ID!): User
    editBio(user_id: ID!, bio: String!): User
  }
`
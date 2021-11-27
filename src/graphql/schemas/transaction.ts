export default `
    type Transaction {
        transaction_id: ID!
        action_id: ID!
        sender: String!
        receiver: String!
        time: String!
        setrep_param: Int
    }

    extend type Query {
        alltransactions: [Transaction!]
        usertransactions(user_id: ID!): [Transaction!]
    }
`
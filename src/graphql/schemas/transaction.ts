import { gql } from "apollo-server-core";

export default gql`
  type Transaction {
    transaction_id: ID!
    action_id: ID!
    sender: ID!
    receiver: ID!
    time: String!
    setrep_param: Int
  }
`
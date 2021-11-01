import { gql } from "apollo-server-core";


export default gql`
  type Action {
    action_id: ID!
    action_name: String
  }
`
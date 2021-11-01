import { gql } from 'apollo-server-express'

import action from './action'
import game from './game'
import tag from './tag'
import transaction from './transaction'
import user from './user'

const rootType = gql`
  type Query {
    root: String
  }
`

export default [rootType, action, game, tag, transaction, user]
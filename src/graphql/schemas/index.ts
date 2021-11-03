import { gql } from 'apollo-server-express'

import game from './game'
import user from './user'
import tag from './tag'

export const rootSchema = `
  type Query {
    root: String
  }
`

const rootType = gql`${rootSchema}`

export default [rootType, game, tag, user]
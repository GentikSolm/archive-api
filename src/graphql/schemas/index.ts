import gameSchema from './game'
import userSchema from './user'
import tagSchema from './tag'
import transactionSchema from './transaction'

export const rootSchema = `
  type Query {
    root: String
  }

  type Mutation {
    root: String
  }
`

export default [rootSchema, gameSchema, userSchema, tagSchema, transactionSchema]
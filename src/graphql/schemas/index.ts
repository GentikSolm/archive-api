import gameSchema from './game'
import userSchema from './user'
import tagSchema from './tag'

export const rootSchema = `
  type Query {
    root: String
  }
`

export default [rootSchema, gameSchema, userSchema, tagSchema]
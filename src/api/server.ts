import * as express from 'express'
import { createServer } from 'http'
import * as cors from 'cors'
import * as compression from 'compression'
import isAuth from '../middleware/is-auth'
import { json } from 'body-parser'
import { graphqlHTTP } from 'express-graphql'

import typeDefs from '../graphql/schemas'
import resolvers from '../graphql/resolvers'
import { makeExecutableSchema } from '@graphql-tools/schema'

const app = express()
app.use(cors())
app.use(compression())
app.use(isAuth)
app.use(json())
app.use('/graphql', graphqlHTTP({
    schema: makeExecutableSchema({
        typeDefs,
        resolvers
    }),
    graphiql: true,
    pretty: true
}))

const httpServer = createServer(app)

export { httpServer }

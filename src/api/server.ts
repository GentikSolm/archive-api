import * as express from 'express'
import { createServer } from 'http'
import { ApolloServerPluginDrainHttpServer } from 'apollo-server-core'
import { ApolloServer } from 'apollo-server-express'
import * as cors from 'cors'
import * as compression from 'compression'

import typeDefs from '../graphql/schemas'
import resolvers from '../graphql/resolvers'


export const start = async (port: any) => {
  const app = express()
  app.use(cors())
  app.use(compression())
  const httpServer = createServer(app)
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })]
  })
  await server.start()
  server.applyMiddleware({ app, path: '/graphql' })
  await new Promise<void>(resolve => httpServer.listen({ port }, resolve))
  console.log(`Server ready at http://localhost:${port}`)
}

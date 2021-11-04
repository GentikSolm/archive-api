import { httpServer } from './api/server'

require('dotenv').config()

process.on('uncaughtException', (err) => {
  console.error('uncaughtException', err)
  process.exit(0)
})

process.on('unhandledRejection', (err) => {
  console.error('unhandledRejection', err)
  process.exit(0)
})

httpServer.listen(process.env.PORT)
console.log(`http://localhost:${process.env.PORT}`)

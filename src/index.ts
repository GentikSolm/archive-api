require('dotenv').config()

import { start } from './api/server'

(async () => {
  const port = process.env.PORT

  process.on('uncaughtException', (err) => {
    console.error('uncaughtException', err)
    process.exit(0)
  })

  process.on('unhandledRejection', (err) => {
    console.error('unhandledRejection', err)
    process.exit(0)
  })
  await start(port)
})()

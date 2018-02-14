import express from 'express'
import bodyParser from 'body-parser'
import { graphqlExpress, graphiqlExpress } from 'apollo-server-express'
import cors from 'cors'
import morgan from 'morgan'
import fs from 'fs'
import https from 'https'

import { mongoose, connection } from './config'
import schema from './schema'

const app = express()
const port = process.env.PORT

app.use(cors())
app.use(
  '/graphql',
  morgan('dev'),
  bodyParser.json({ limit: 1024 * 1024 * 2000, type: 'application/json' }),
  graphqlExpress({ schema })
)
app.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }))

connection.on('error', () => console.log('Error connecting to database'))
connection.on('open', () => console.log('Connected to database'))

https
  .createServer(
    {
      key: fs.readFileSync('/etc/letsencrypt/live/ardy.dhnlr.com/privkey.pem'),
      cert: fs.readFileSync(
        '/etc/letsencrypt/live/ardy.dhnlr.com/fullchain.pem'
      )
    },
    app
  )
  .listen(443)

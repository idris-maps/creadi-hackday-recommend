import * as express from 'express'
import * as cors from 'cors'
import * as bodyParser from 'body-parser'

const app: express.Application = express()

app.use(cors())
app.use(bodyParser.json())

export default app
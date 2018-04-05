import * as express from 'express'
import * as cors from 'cors'
import * as bodyParser from 'body-parser'

import holidaysController from './controllers/holidaysController'

const app: express.Application = express()

app.use(cors())
app.use(bodyParser.json())
app.use('/holidays', holidaysController)

export default app
import * as express from 'express'
import * as cors from 'cors'
import * as bodyParser from 'body-parser'

import holidaysController from './controllers/holidaysController'
import recommendationsController from './controllers/recommendationsController'

const app: express.Application = express()

app.use(cors())
app.use(bodyParser.json())
app.use('/holidays', holidaysController)
app.use('/recommendations', recommendationsController)

export default app
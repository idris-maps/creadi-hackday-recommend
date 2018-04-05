import * as mongoose from 'mongoose'
import env from '../env'

import holidayType from './holidayType'
import wikiPage from './wikiPage'

mongoose.connect(env.mongoUri)
export const db = mongoose.connection
export const HolidayType = holidayType(db)
export const WikiPage = wikiPage(db)

db.on('error', console.log)
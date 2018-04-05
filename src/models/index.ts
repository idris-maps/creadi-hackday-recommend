import * as mongoose from 'mongoose'
import env from '../env'

import holidayType from './holidayType'

mongoose.connect(env.mongoUri)
export const db = mongoose.connection
export const HolidayType = holidayType(db)

db.on('error', console.log)
import {
  Connection,
  Document,
  Model,
  Schema,
  model,
} from 'mongoose'

export interface Keyword {
  word: string
  points: number
}

export type Season = '*' | 'Winter' | 'Frühling' | 'Sommer' | 'Herbst'

export interface HolidayTypeInterface {
  holiday: string
  keywords?: Keyword[]
  seasons?: Season[]
}

export interface HolidayTypeModel extends HolidayTypeInterface, Document {

}

const schema: Schema = new Schema({
  word: { type: String, required: true },
  points: { type: Array, default: [] },
  seasons: { type: Array, default: [] }
})

export default (connection: Connection): Model<HolidayTypeModel> =>
  connection.model<HolidayTypeModel>('HolidayType', schema)
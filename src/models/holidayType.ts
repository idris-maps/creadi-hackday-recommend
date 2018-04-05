import {
  Connection,
  Document,
  Model,
  Schema,
  model,
} from 'mongoose'

export interface Keyword {
  keyword: string
  points: number
}

export type Season = '*' | 'Winter' | 'Frühling' | 'Sommer' | 'Herbst'

export interface HolidayTypeInterface {
  holiday: string
  keywords?: Keyword[]
  seasons?: Season[]
}

export interface HolidayTypeModel extends HolidayTypeInterface, Document {
  addKeyword(keyword: string, points?: number): Promise<HolidayTypeModel>
  deleteKeyword(keyword: string): Promise<HolidayTypeModel>
  updateKeywordPoints(keyword: string, points: number): Promise<HolidayTypeModel>
  addSeason(season: Season): Promise<HolidayTypeModel>
  deleteSeason(season: Season): Promise<HolidayTypeModel>
}

const schema: Schema = new Schema({
  holiday: { type: String, required: true },
  keywords: { type: Array, default: [] },
  seasons: { type: Array, default: [] }
})

schema.methods.addKeyword = function(keyword: string, points = 1): Promise<HolidayTypeModel> {
  const keywords = [...this.keywords, { keyword, points }]
  const model = this.model(this.constructor.modelName, this.schema)
  return model.findByIdAndUpdate(this._id, { $set: { keywords } }, { new: true })
}

schema.methods.deleteKeyword = function(keywordToDelete: string): Promise<HolidayTypeModel> {
  const keywords = this.keywords.filter(({ keyword }) => keyword !== keywordToDelete)
  const model = this.model(this.constructor.modelName, this.schema)
  return model.findByIdAndUpdate(this._id, { $set: { keywords } }, { new: true })
}

schema.methods.updateKeywordPoints = function(keywordToUpdate: string, points: number): Promise<HolidayTypeModel> {
  const toUpdate = this.keywords.find(({ keyword }) => keyword === keywordToUpdate)
  toUpdate.points = points
  const otherKeywords = this.keywords.filter(({ keyword }) => keyword !== keywordToUpdate)
  const keywords = [...otherKeywords, toUpdate]
  const model = this.model(this.constructor.modelName, this.schema)
  return model.findByIdAndUpdate(this._id, { $set: { keywords } }, { new: true })
}

schema.methods.addSeason = function(season: Season): Promise<HolidayTypeModel> {
  const seasons = [...this.seasons, season]
  const model = this.model(this.constructor.modelName, this.schema)
  return model.findByIdAndUpdate(this._id, { $set: { seasons } }, { new: true })
}

schema.methods.deleteSeason = function(seasonToDelete: Season): Promise<HolidayTypeModel> {
  const seasons = this.seasons.filter(season => season !== seasonToDelete)
  const model = this.model(this.constructor.modelName, this.schema)
  return model.findByIdAndUpdate(this._id, { $set: { seasons } }, { new: true })
}

export default (connection: Connection): Model<HolidayTypeModel> =>
  connection.model<HolidayTypeModel>('HolidayType', schema)
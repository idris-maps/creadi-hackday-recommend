import {
  Connection,
  Document,
  Model,
  Schema,
  model,
} from 'mongoose'


export interface WikiPageInterface {
  name: string
  wikipedia?: string
  wikivoyage?: string
}

export interface WikiPageModel extends WikiPageInterface, Document {
}

const schema: Schema = new Schema({
  name: { type: String, required: true },
  wikipedia: { type: String },
  wikivoyage: { type: String }
})

export default (connection: Connection): Model<WikiPageModel> =>
  connection.model<WikiPageModel>('WikiPage', schema)
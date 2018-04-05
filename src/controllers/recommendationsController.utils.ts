// types
import { Request } from 'express'
import { Recommendation } from '../utils/getHolidayTypes'

// TODO proper validation

const isString = (value: any): boolean => typeof value === 'string'
const isDate = (value: any): boolean =>
isString(value)
  ? value
      .split('-')
      .map(part => Number(part))
      .map(n => !isNaN(n))
      .filter(bool => bool).length === 3
  : false

export const isValidReq = (req: Request): boolean => {
  const { place, date } = req.query
  return place && date && isString(place) && isDate(date)
}

export const sanitizeReq = (req: Request): Recommendation => ({
  placeName: decodeURIComponent(req.query.place),
  date: new Date(req.query.date),
})
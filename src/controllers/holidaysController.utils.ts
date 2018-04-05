// types
import { Request } from 'express'
import { Season } from '../models/holidayType'

// TODO proper validation

const isArray = (value: any): boolean => Array.isArray(value)
const isString = (value: any): boolean => typeof value === 'string'
const isInteger = (value: any): boolean => Number.isInteger(value)
const isIntegerOrUndefined = (value: any): boolean =>
  !value ? true : isInteger(value)
const seasons: Season[] = ['*', 'Winter', 'Frühling', 'Sommer', 'Herbst']
const isSeason = (value: any) =>
  value && isString(value) && seasons.includes(value)

export const isValidPost = (req: Request): boolean => {
  const { holiday, keywords, seasons } = req.body
  return isString(holiday) && isArray(keywords) && isArray(seasons)
}

export const isValidAddKeyword = (req: Request): boolean => {
  const { keyword, points } = req.body
  return isString(keyword) && isIntegerOrUndefined(points)
}

export const isValidAddSeason = (req: Request): boolean =>
  isSeason(req.body.season)

export const sanitizeSeason = (req: Request): Season => {
  // @ts-ignore
  return   seasons.includes(decodeURIComponent(req.params.season))
  ? decodeURIComponent(req.params.season)
  : '*'
}

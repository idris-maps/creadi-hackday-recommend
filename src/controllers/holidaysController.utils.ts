import { Request } from 'express'

const isArray = (value: any): boolean => Array.isArray(value)
const isString = (value: any): boolean => typeof value === 'string'
const isInteger = (value: any): boolean => Number.isInteger(value)
const isIntegerOrUndefined = (value: any): boolean =>
  !value ? true : isInteger(value)

// TODO proper validation

export const isValidPost = (req: Request): boolean => {
  const { holiday, keywords, seasons } = req.body
  return isString(holiday) && isArray(keywords) && isArray(seasons)
}

export const isValidAddKeyword = (req: Request): boolean => {
  const { keyword, points } = req.body
  return isString(keyword) && isIntegerOrUndefined(points)
}

import { Request } from 'express'

const isArray = (value: any): boolean => Array.isArray(value)
const isString = (value: any): boolean => typeof value === 'string'

export const isValidPost = (req: Request): boolean => {
  // TODO proper validation
  const { holiday, keywords, seasons } = req.body
  return isString(holiday) && isArray(keywords) && isArray(seasons)
    ? true
    : false
}
// types
import { HolidayTypeInterface } from '../models/holidayType'
import { HolidayScore } from './getHolidayScore.d'

const sum = (points: number[]): number =>
  points.reduce((result, value) => result + value, 0)

const sortByScore = (a, b): number => a.score > b.score ? -1 : 1

export default (page: string, types: HolidayTypeInterface[]): HolidayScore[] =>
  types.map(type => ({
      ...type,
      points: type.keywords.map(({ keyword, points }) => page.includes(keyword) ? points : 0),
    }))
    .map(({ holiday, points }) => ({
      holiday,
      score: sum(points),
    }))
    .sort(sortByScore)
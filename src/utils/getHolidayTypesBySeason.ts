import { uniq, flatten } from 'lodash'
import getHemisphere, { Hemisphere } from './getHemisphere'
import { HolidayType } from '../models'
// types
import { Place } from './getCoordinates.d'
import { HolidayTypeInterface, Season } from '../models/holidayType'
import { Months, HolidayTypeWithMonths } from './getHolidayTypesBySeason.d'

const allMonths = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
const months: Months = {
  north: {
    '*': allMonths,
    'Winter': [12, 1, 2, 3],
    'Frühling': [3, 4, 5, 6],
    'Sommer': [6, 7, 8, 9],
    'Herbst': [9, 10, 11, 12],
  },
  south: {
    '*': allMonths,
    'Winter': [6, 7, 8, 9],
    'Frühling': [9, 10, 11, 12],
    'Sommer': [12, 1, 2, 3],
    'Herbst': [3, 4, 5, 6],
  },
  tropics: {
    '*': allMonths,
    'Winter': [],
    'Frühling': allMonths,
    'Sommer': [12, 1, 2, 3],
    'Herbst': allMonths,
  }
}

const getMonths = (seasons: Season[], hemisphere: Hemisphere): number[] =>
  uniq(flatten(seasons.map(season => months[hemisphere][season])))

const typesWithMonths = (hemisphere: Hemisphere) => (types: HolidayTypeInterface[]): HolidayTypeWithMonths[] =>
  types
    .map(({ holiday, keywords, seasons }) => ({
      holiday,
      keywords,
      seasons,
      months: getMonths(seasons, hemisphere),
    }))

const getMonth = (date: Date): number => new Date(date).getMonth() + 1

export default (place: Place, date: Date): Promise<HolidayTypeInterface[]> =>
  HolidayType.find()
    .then(typesWithMonths(getHemisphere(place)))
    .then(types => types.filter(({ months }) => months.includes(getMonth(date))))
    .then(types => types.map(({ holiday, keywords, seasons }) => ({ holiday, keywords, seasons })))

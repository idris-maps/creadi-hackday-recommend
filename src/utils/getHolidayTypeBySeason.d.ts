import { HolidayTypeInterface } from '../models/holidayType'

export interface MonthsByHemisphere {
  [key: string]: number[]
}

export interface Months {
  north: MonthsByHemisphere
  south: MonthsByHemisphere
  tropics: MonthsByHemisphere
}

export interface HolidayTypeWithMonths extends HolidayTypeInterface {
  months: number[]
}
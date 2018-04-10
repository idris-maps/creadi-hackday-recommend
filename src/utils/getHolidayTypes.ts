import getCoordinates from './getCoordinates'
import getWikiPage from './getWikiPage'
import getHolidayTypesBySeason from './getHolidayTypesBySeason'
import getHolidayScore from './getHolidayScore'
import closeBy from './closeBy'
// types
import { HolidayScore } from './getHolidayScore.d'

export interface Recommendation {
  placeName: string
  date: Date
}

export interface Res {
  score: HolidayScore[]
  closeBy: {
    [key:string]: Object[]
  }
}

export default ({ placeName, date }: Recommendation): Promise<Res> =>
  getCoordinates(placeName)
    .then(place => Promise.all([
      getWikiPage(place),
      getHolidayTypesBySeason(place, date),
      closeBy(place.latitude, place.longitude),
    ]))
    .then(([page, types, closeBy]) => ({
      score: getHolidayScore(page, types),
      closeBy,
    }))

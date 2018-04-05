import getCoordinates from './getCoordinates'
import getWikiPage from './getWikiPage'
import getHolidayTypesBySeason from './getHolidayTypesBySeason'
import getHolidayScore from './getHolidayScore'
// types
import { HolidayScore } from './getHolidayScore.d'

export default (placeName: string, date: Date): Promise<HolidayScore[]> =>
  getCoordinates(placeName)
    .then(place => Promise.all([
      getWikiPage(place),
      getHolidayTypesBySeason(place, date),
    ]))
    .then(([page, types]) => getHolidayScore(page, types))

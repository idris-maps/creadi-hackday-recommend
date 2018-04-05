import * as distance from 'haversine'
// types
import { WikiCoordinates } from './getWikiPage.d'
import { Place } from './getCoordinates.d'

export default (wikiCoordinates: WikiCoordinates, place: Place, km = 20): boolean => {
  const wikiPoint = {
    latitude: wikiCoordinates ? wikiCoordinates.lat : undefined,
    longitude: wikiCoordinates ? wikiCoordinates.lon : undefined,
  }
  const placePoint = {
    latitude: place.latitude,
    longitude: place.longitude
  }
  return wikiPoint.latitude && wikiPoint.longitude
    ? distance(wikiPoint, placePoint) < km
    : false
}
import axios, { AxiosResponse } from 'axios'
import env from '../env'
// types
import { TextSearchResults, Place } from './getCoordinates.d'

const textSearchUrl = (place: string): string =>
  `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${place}&key=${env.placesApiKey}&language=de`

const formatResponse = (res: AxiosResponse): Place => {
  const results: TextSearchResults = res.data.results
  const place = results[0]
  const {
    formatted_address,
    geometry,
    name,
  } = place
  const latitude = geometry.location.lat
  const longitude = geometry.location.lng
  return {
    formattedAddress: formatted_address,
    latitude,
    longitude,
    name,
  }
}

export default (place: string): Promise<Place> =>
  axios.get(textSearchUrl(place))
    .then(formatResponse)
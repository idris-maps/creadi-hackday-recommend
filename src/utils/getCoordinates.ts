import axios, { AxiosResponse } from 'axios'
import env from '../env'
// types
import { TextSearchResults, Place } from './getCoordinates.d'

const textSearchUrl = (place: string): string =>
  `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${place}&key=${env.placesApiKey}&language=de`

const osmSearchUrl = (place: string): string =>
  `https://nominatim.openstreetmap.org/search?q=liverpool&format=json`

const osmFallback = (place: string): Promise<Place> =>
  axios.get(osmSearchUrl(place))
    .then(res => res.data)
    .then(data => data.length === 0
      ? { name: place }
      : {
          name: place,
          formattedAddress: data[0].display_name,
          latitude: Number(data[0].lat),
          longitude: Number(data[0].lon),
        })

const formatResponse = (place: string) => (res: AxiosResponse): Promise<Place> => {
  const results: TextSearchResults = res.data.results
  if (results.length === 0) {
    return osmFallback(place)
  }
  const geo = results[0]
  const {
    formatted_address,
    geometry,
    name,
  } = geo
  const latitude = geometry.location.lat
  const longitude = geometry.location.lng
  return Promise.resolve({
    formattedAddress: formatted_address,
    latitude,
    longitude,
    name,
  })
}

export default (place: string): Promise<Place> =>
  axios.get(textSearchUrl(place))
    .then(formatResponse(place))
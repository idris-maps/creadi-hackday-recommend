import { flatten } from 'lodash'
import buffer from '@turf/buffer'
import inside from '@turf/boolean-point-in-polygon'

// types
import { Feature } from './nearBy'

const getTile = (data, latFloor: number, lonFloor: number): Feature[] =>
  data[latFloor] && data[latFloor][lonFloor]
    ? data[latFloor][lonFloor]
    : []

const getTiles = (data, lat: number, lon: number): Feature[] => {
  const latFloor = Math.floor(lat)
  const lonFloor = Math.floor(lon)
  return flatten([
    getTile(data, latFloor - 1, lonFloor -1),
    getTile(data, latFloor - 1, lonFloor),
    getTile(data, latFloor - 1, lonFloor + 1),
    getTile(data, latFloor, lonFloor - 1),
    getTile(data, latFloor, lonFloor),
    getTile(data, latFloor, lonFloor + 1),
    getTile(data, latFloor + 1, lonFloor -1),
    getTile(data, latFloor + 1, lonFloor),
    getTile(data, latFloor + 1, lonFloor + 1),
  ])
}

export default data => (lat: number, lon: number, km = 20): Object[] => {
  const pt: Feature = { type: 'Feature', properties: {}, geometry: { type: 'Point', coordinates: [lon, lat] } }
  const area = buffer(pt, km)
  const d = getTiles(data, lat, lon)
  return d
    .filter(f => inside(f, area))
    .map(({ properties }) => properties)
}
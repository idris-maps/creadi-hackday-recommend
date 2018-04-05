// types
import { Place } from './getCoordinates.d'

export type Hemisphere = 'north' | 'south' | 'tropics'

export const N: Hemisphere = 'north'
export const S: Hemisphere = 'south'
export const TROPICS: Hemisphere = 'tropics'

export default (place: Place): Hemisphere =>
  place.latitude > 32
    ? N
    : place.latitude < -32
      ? S
      : TROPICS
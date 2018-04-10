interface Point {
  type: 'Point',
  coordinates: number[]
}

export interface Feature {
  type: 'Feature'
  properties: Object
  geometry: Point
}
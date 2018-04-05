export interface WikiCoordinates {
  lat: number
  lon: number
}

export interface WikiPageContent {
  content: string
  coordinates: WikiCoordinates
}
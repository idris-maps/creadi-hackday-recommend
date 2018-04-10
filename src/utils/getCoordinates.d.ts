interface Geom {
  lat: number
  lng: number
}

export interface TextSearchResult {
  formatted_address: string
  geometry: {
    location: Geom
    viewport: {
      northeast: Geom
      southwest: Geom
    }
  }
  icon: string
  id: string
  name: string
  photos: Object[]
  place_id: string
  reference: string
  types: string[]
}

export type TextSearchResults = TextSearchResult[]

export interface Place {
  formattedAddress?: string
  latitude?: number
  longitude?: number
  name: string
}

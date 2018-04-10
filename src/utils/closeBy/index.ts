import getNear from './getNear'
import golfClubs from './data/golfClubs'
import bikeParks from './data/bikeParks'
import skiResorts from './data/skiResorts'
import cities from './data/cities'

export default (lat: number, lon: number) =>
  lat && lon
    ? {
        golfClubs: getNear(golfClubs)(lat, lon),
        bikeParks: getNear(bikeParks)(lat, lon),
        skiResorts: getNear(skiResorts)(lat, lon),
        cities: getNear(cities)(lat, lon),
      }
    : {
        golfClubs: [],
        bikeParks: [],
        skiResorts: [],
        cities: [],
      }
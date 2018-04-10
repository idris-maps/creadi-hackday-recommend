import getNear from './getNear'
const golfClubs = require('./data/golfClubs.json')
const bikeParks = require('./data/bikeParks.json')
const skiResorts = require('./data/skiResorts.json')
const cities = require('./data/cities.json')

export default (lat: number, lon: number) => ({
  golfClubs: getNear(golfClubs)(lat, lon),
  bikeParks: getNear(bikeParks)(lat, lon),
  skiResorts: getNear(skiResorts)(lat, lon),
  cities: getNear(cities)(lat, lon),
})
import getNear from './getNear'
const golfClubs = require('./data/golfClubs.json')
const bikeParks = require('./data/bikeParks.json')
const skiResorts = require('./data/skiResorts.json')
const cities = require('./data/cities.json')

export default {
  golfClubs: getNear(golfClubs),
  bikeParks: getNear(bikeParks),
  skiResorts: getNear(skiResorts),
  cities: getNear(cities),
}
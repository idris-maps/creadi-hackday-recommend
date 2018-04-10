const getNear = require('./getNear')
const golfClubs = require('./data/golfClubs.json')
const bikeParks = require('./data/bikeParks.json')
const skiResorts = require('./data/skiResorts.json')
const cities = require('./data/cities.json')

module.exports = {
  golfClubs: getNear(golfClubs),
  bikeParks: getNear(bikeParks),
  skiResorts: getNear(skiResorts),
  cities: getNear(cities),
}
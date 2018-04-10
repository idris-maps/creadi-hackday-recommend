import * as test from 'tape'
import closeBy from '../../src/utils/closeBy'

const basel = {
  lat:47.559599,
  lon: 7.588576,
}

test('closeBy', t => {
  const cities = closeBy.cities(basel.lat, basel.lon)
  t.true(Array.isArray(cities))
  const bikeParks = closeBy.bikeParks(basel.lat, basel.lon)
  t.true(Array.isArray(bikeParks))
  const skiResorts = closeBy.skiResorts(basel.lat, basel.lon)
  t.true(Array.isArray(skiResorts))
  const golfClubs = closeBy.golfClubs(basel.lat, basel.lon)
  t.true(Array.isArray(golfClubs))
  t.end()
})
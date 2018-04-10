import * as test from 'tape'
import closeBy from '../../src/utils/closeBy'

const basel = {
  lat:47.559599,
  lon: 7.588576,
}

test('closeBy', t => {
  const { cities, bikeParks, skiResorts, golfClubs } = closeBy(basel.lat, basel.lon)
  t.true(Array.isArray(cities))
  t.true(Array.isArray(bikeParks))
  t.true(Array.isArray(skiResorts))
  t.true(Array.isArray(golfClubs))
  t.end()
})
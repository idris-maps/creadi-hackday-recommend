import * as test from 'tape'
import getCoordinates from '../../src/utils/getCoordinates'

test('getCoordinates', t => {
  getCoordinates('basel')
    .then(res => {
      t.true(res.formattedAddress, 'should return formattedAddress')
      t.true(res.latitude, 'should return latitude')
      t.true(res.longitude, 'should return longitude')
      t.true(res.name, 'should return name')
      t.end()
    })
    .catch(t.end)
})
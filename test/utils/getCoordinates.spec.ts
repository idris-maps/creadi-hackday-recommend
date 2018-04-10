import * as test from 'tape'
import getCoordinates from '../../src/utils/getCoordinates'

test('getCoordinates with basel', t => {
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

test('getCoordinates with liverpool', t => {
  getCoordinates('liverpool')
    .then(res => {
      t.true(res.formattedAddress, 'should return formattedAddress')
      t.true(res.latitude, 'should return latitude')
      t.true(res.longitude, 'should return longitude')
      t.true(res.name, 'should return name')
      t.end()
    })
    .catch(t.end)
})
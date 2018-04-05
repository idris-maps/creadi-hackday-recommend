import * as test from 'tape'
import getHemisphere, { N, S, TROPICS } from '../../src/utils/getHemisphere'

const tenerife = {
  formattedAddress: 'Provinz Santa Cruz de Tenerife, Spanien',
  latitude: 28.2915637,
  longitude: -16.6291304,
  name: 'Teneriffa',
}

const sydney = {
  formattedAddress: 'New South Wales, Australia',
  latitude: -33.8688197,
  longitude: 151.2092955,
  name: 'Sydney',
}

const basel = {
  formattedAddress: 'Switzerland',
  latitude: 47.5595986,
  longitude: 7.5885761,
  name: 'Basel',
}

test('getHemisphere', t => {
  const h1 = getHemisphere(tenerife)
  t.same(h1, TROPICS, 'should return tropics for tenerife')
  const h2 = getHemisphere(basel)
  t.same(h2, N, 'should return north for basel')
  const h3 = getHemisphere(sydney)
  t.same(h3, S, 'should return south for sydney')
  t.end()
})
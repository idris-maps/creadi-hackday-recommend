import * as test from 'tape'
import getWikiPage from '../../src/utils/getWikiPage'

const basel = {
  formattedAddress: 'Switzerland',
  latitude: 47.5595986,
  longitude: 7.5885761,
  name: 'Basel',
}

test('getWikiPage', t => {
  getWikiPage(basel)
    .then(content => {
      t.same(typeof content, 'string', 'should return a string')
      t.end()
    })
    .catch(t.end)
})
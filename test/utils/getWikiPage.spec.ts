import * as test from 'tape'
import getWikiPage from '../../src/utils/getWikiPage'

test('getWikiPage', t => {
  getWikiPage('Laax')
    .then(content => {
      t.same(typeof content, 'string', 'should return a string')
      t.end()
    })
    .catch(t.end)
})
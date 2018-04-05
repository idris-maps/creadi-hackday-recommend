import * as test from 'tape'
import { WikiPage } from '../../src/models'

test('WikiPage model', t => {
  let id
  WikiPage.create({
      name: 'Test',
      wikipedia: 'test wikipedia',
      wikivoyage: 'test wikivoyage',
    })
    .then(page => {
      id = page._id
      t.true(page._id, 'should return _id on create')
      return WikiPage.findById(id)
    })
    .then(page => page.remove())
    .then(() => WikiPage.findById(id))
    .then(page => {
      t.false(page, 'should delete')
      t.end()
    })
    .catch(t.end)
})
import * as test from 'tape'
import getHolidayTypes from '../../src/utils/getHolidayTypes'
import { HolidayType } from '../../src/models'
import { types } from './getHolidayTypes.data'

test('Prepare data', t => {
  HolidayType.remove({})
    .then(() => Promise.all(types.map(type => HolidayType.create(type))))
    .then(() => t.end())
    .catch(t.end)
})

test('getHolidayTypes with Laax in winter', t => {
  getHolidayTypes('Laax', new Date('2019-01-01'))
    .then(res => {
      const first = res[0]
      t.same(first.holiday, 'Skiferien', 'should return ski holidays as first choice')
      t.end()
    })
    .catch(t.end)
})
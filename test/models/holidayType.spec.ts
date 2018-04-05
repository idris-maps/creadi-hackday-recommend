import * as test from 'tape'
import { db, HolidayType } from '../../src/models/index'

let existingId

test('HolidayType model create', t => {
  HolidayType.create({
      holiday: 'Test1',
      keywords: [{ word: 'Ski', points: 2 }],
      seasons: ['Winter']
    })
    .then(holidayType => {
      existingId = holidayType._id
      t.true(holidayType._id, 'should return _id')
      t.end()
    })
    .catch(t.end)
})

test('HolidayType model find', t => {
  HolidayType.find()
    .then(holidayTypes => {
      t.true(Array.isArray(holidayTypes), 'should return an array')
      t.end()
    })
    .catch(t.end)
})

test('HolidayType model findById add / delete keyword', t => {
  HolidayType.findById(existingId)
    .then(holidayType => {
      t.same(holidayType.holiday, 'Test1', 'should return a holiday type')
      return holidayType.addKeyword('Bike', 2)
    })
    .then(added => {
      t.same(added.keywords.filter(({ keyword }) => keyword === 'Bike').length, 1, 'should add keyword')
      return added.deleteKeyword('Ski')
    })
    .then(deleted => {
      t.same(deleted.keywords.filter(({ keyword }) => keyword === 'Ski').length, 0, 'should delete keyword')
      t.end()
    })
    .catch(t.end)
})

test.onFinish(() => { db.close() })
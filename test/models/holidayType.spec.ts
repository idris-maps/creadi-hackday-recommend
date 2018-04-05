import * as test from 'tape'
import { db, HolidayType } from '../../src/models/index'

let existingId

test('HolidayType model create', t => {
  HolidayType.create({
      holiday: 'Test1',
      keywords: [{ keyword: 'Ski', points: 2 }],
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
      t.true(added.keywords.find(({ keyword }) => keyword === 'Bike'), 'should add keyword')
      return added.deleteKeyword('Ski')
    })
    .then(deleted => {
      t.false(deleted.keywords.find(({ keyword }) => keyword === 'Ski'), 'should delete keyword')
      t.end()
    })
    .catch(t.end)
})

test.onFinish(() => { db.close() })
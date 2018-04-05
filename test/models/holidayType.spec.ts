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
    .then(d => {
      t.true(d.keywords.find(({ keyword }) => keyword === 'Bike'), 'should add keyword')
      return d.deleteKeyword('Ski')
    })
    .then(d => {
      t.false(d.keywords.find(({ keyword }) => keyword === 'Ski'), 'should delete keyword')
      return d.updateKeywordPoints('Bike', 22)
    })
    .then(d => {
      t.same(d.keywords.find(({ keyword }) => keyword === 'Bike').points, 22, 'should update points')
      return d.addSeason('Sommer')
    })
    .then(d => {
      t.true(d.seasons.find(season => season === 'Sommer'), 'should add season')
      return d.deleteSeason('Winter')
    })
    .then(d => {
      t.false(d.seasons.find(season => season === 'Winter'), 'should delete season')
      t.end()
    })
    .catch(t.end)
})

test.onFinish(() => { db.close() })
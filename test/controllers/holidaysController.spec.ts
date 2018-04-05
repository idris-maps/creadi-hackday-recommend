import * as test from 'tape'
import * as supertest from 'supertest'
import app from '../../src/app'
import { HolidayType } from '../../src/models'

const request = supertest(app)

const data = {
  holiday: 'Test2',
  keywords: [{ keyword: 'Bike', points: 1 }],
  seasons: ['*'],
}
let existingId

test('POST /holidays', t => {
  request.post('/holidays')
    .type('json')
    .send(data)
    .expect(200)
    .end((err, res) => {
      existingId = res.body._id
      t.true(res.body._id, 'should return _id')
      t.end(err)
    })
})

test('GET /holidays', t => {
  request.get('/holidays')
    .expect(200)
    .end((err, res) => {
      t.true(Array.isArray(res.body), 'should return an array')
      t.true(res.body.find(({ _id }) => _id === existingId), 'should contain created holiday')
      t.end(err)
    })
})

test('GET /holidays/:holidayTypeId', t => {
  request.get('/holidays/' + existingId)
    .expect(200)
    .end((err, res) => {
      t.same(res.body._id, existingId, 'should return created holiday')
      t.end(err)
    })
})

test('POST /holidays/:holidayTypeId/keywords', t => {
  request.post('/holidays/' + existingId + '/keywords')
    .type('json')
    .send({ keyword: 'Ski', points: 10 })
    .expect(200)
    .end((err, res) => {
      t.true(res.body.keywords.find(({ keyword }) => keyword === 'Ski'), 'should add keyword')
      t.end(err)
    })
})

test('DELETE /holidays/:holidayTypeId/keywords/:keyword', t => {
  request.delete('/holidays/' + existingId + '/keywords/Bike')
    .expect(200)
    .end((err, res) => {
      t.false(res.body.keywords.find(({ keyword }) => keyword === 'Bike'), 'should delete keyword')
      t.end(err)
    })
})

test('PATCH /holidays/:holidayTypeId/keywords/:keyword', t => {
  request.patch('/holidays/' + existingId + '/keywords/Ski')
    .type('json')
    .send({ points: 33 })
    .expect(200)
    .end((err, res) => {
      t.same(res.body.keywords.find(({ keyword }) => keyword === 'Ski').points, 33, 'should update keyword points')
      t.end(err)
    })
})

test('DELETE /holidays/:holidayTypeId', t => {
  request.delete('/holidays/' + existingId)
    .expect(204)
    .end((err, res) => {
      HolidayType.findById(existingId)
        .then(holiday => {
          t.false(holiday, 'should have deleted holiday')
          t.end(err)
        })
        .catch(t.end)
    })
})
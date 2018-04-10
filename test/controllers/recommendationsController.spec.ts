import * as test from 'tape'
import * as supertest from 'supertest'
import app from '../../src/app'

const request = supertest(app)

test('GET /recommendations', t => {
  request.get('/recommendations?place=laax&date=2019-01-01')
    .expect(200)
    .end((err, res) => {
      t.true(Array.isArray(res.body.score), 'should return score array')
      t.true(Array.isArray(res.body.closeBy.bikeParks), 'should return bikeParks array')
      t.true(Array.isArray(res.body.closeBy.cities), 'should return cities array')
      t.true(Array.isArray(res.body.closeBy.skiResorts), 'should return skiResorts array')
      t.true(Array.isArray(res.body.closeBy.golfClubs), 'should return golfClubs array')
      t.end(err)
    })
})
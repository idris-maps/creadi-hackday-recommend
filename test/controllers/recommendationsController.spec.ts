import * as test from 'tape'
import * as supertest from 'supertest'
import app from '../../src/app'

const request = supertest(app)

test('GET /recommendations', t => {
  request.get('/recommendations?place=laax&date=2019-01-01')
    .expect(200)
    .end((err, res) => {
      t.true(Array.isArray(res.body), 'should return array')
      const first = res.body[0]
      t.true(first.holiday, 'first should have holiday')
      t.true(first.holiday, 'first should have score')
      t.end(err)
    })
})
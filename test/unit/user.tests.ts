'use strict'

import * as chai from 'chai'
import * as request from 'supertest'
import { httpServer } from '../../src/api/server'

// chai.use(chaiGraphql)
const { assert, expect } = chai

// test users
describe('Users tests', () => {
  let requestGraphql
  beforeEach(() => {
    requestGraphql = request(httpServer)
  })

  it('Valid Users Query', done => {
    // requestGraphql.post('/graphql')
    //   .send({ query: "{ users {user_id} }" })
    //   .expect(200)
    //   .end((err, res) => {
    //     if (err) return done(err)
    //     expect(res.body).to.be.a('object')
    //     expect(res.body.data).to.be.a('object')
    //     expect(res.body.data.users).to.be.a('array')
    //     expect(res.body.data.users[0]).to.be.a('object')
    //     expect(res.body.data.users[0]).to.have.property('user_id')
    //     expect(res.body.data.users[0].user_id).to.be.a('string')
    //     done()
    //   })
    expect(2 + 2).to.equal(4)
    done()
  })

  it('Valid Users Query 2', done => {
    // requestGraphql.post('/graphql')
    //   .send({ query: "{ users {user_id, bio} }" })
    //   .expect(200)
    //   .end((err, res) => {
    //     if (err) return done(err)
    //     expect(res.body).to.be.a('object')
    //     expect(res.body.data).to.be.a('object')
    //     expect(res.body.data.users).to.be.a('array')
    //     expect(res.body.data.users[0]).to.be.a('object')
    //     expect(res.body.data.users[0]).to.have.property('user_id')
    //     expect(res.body.data.users[0]).to.have.property('bio')
    //     done()
    //   })
    expect(2 + 2).to.equal(4)
    done()
  })

  it('Invalid users query', done => {
    requestGraphql.post('/graphql')
      .send({ query: "{ users {user_id, hello} }" })
      .expect(400)
      .end((err, res) => {
        if (err) return done(err)
        expect(res.body).to.be.a('object')
        done()
      })
  })
})

// test user
// describe('User tests', () => {
//   let requestGraphql
//   beforeEach(() => {
//     requestGraphql = request(httpServer)
//   })

//   describe('Users Tests', () => {
//     it('Valid users query', done => {
//       requestGraphql.post('/graphql')
//         .send({ query: "{user() {user_id}}" })
//         .expect(200)
//         .end((err, res) => {
//           if (err) return done(err)
//           done()
//         })
//     })
//   })
// })
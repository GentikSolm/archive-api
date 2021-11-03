'use strict'

import { userSchema } from '../../src/graphql/schemas/user'
import { rootSchema } from '../../src/graphql/schemas/index'
import { expect } from 'chai'
import { done } from 'mocha'
const url = `http://localhost:${PORT}`
const request = require('supertest')(url)

// test users
describe('Users tests', () => {

  beforeEach(() => {
  })

  describe('Usage Tests', () => {
    it('Valid users query', () => {

      const query = {
        query: `users {
            user_id
            rep
            total_trans
            mention_flag
            twitch_id
            bio
          }`
      }

      request.post('/graphql')
        .send(query)
        .expect(200)
        .end((err, res) => {
          if (err) return done(err)
          expect(res.body.data.users).to.be.an('array')
          res.body.users.should.have.propertu('user_id')
          res.body.users.should.have.propertu('rep')
          res.body.users.should.have.propertu('total_trans')
          res.body.users.should.have.propertu('mention_flag')
          res.body.users.should.have.propertu('twitch_id')
          res.body.users.should.have.propertu('bio')
          done()
        })
    })

    it('Invalid users query', () => {
      const query = `
        {
          users {
            user_id
            this_is_not_a_field
            rep
            total_trans
            mention_flag
            twitch_id
            bio
          }
        }
      `
    })
  })
})


// test user
describe('user tests', () => {

  beforeEach(() => {
  })

  describe('Usage Tests', () => {
    it('Valid users query', () => {
      const query = `
        {
          user(user_id: "1234") {
            user_id
            rep
            total_trans
            mention_flag
            twitch_id
            bio
          }
        }
      `
    })

    it('Invalid users query', () => {
      const query = `
        {
          user(user_id: "1234") {
            user_id
            this_is_not_a_field
            rep
            total_trans
            mention_flag
            twitch_id
            bio
          }
        }
      `
    })
  })
})

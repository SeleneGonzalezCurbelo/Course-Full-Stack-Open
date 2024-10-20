const { test, after, beforeEach, describe } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const bcrypt = require('bcryptjs')
const helper = require('./test_helper')
const User = require('../models/user') 
const app = require('../App.js') 
const api = supertest(app)
const assert = require('assert')

describe('POST /api/users', () => {
    beforeEach(async () => {
      await User.deleteMany({})
  
      const passwordHash = await bcrypt.hash('sekret', 10)
      const user = new User({ username: 'root', passwordHash })
  
      await user.save()
    })
  
    test('creation succeeds with a fresh username', async () => {
      const usersAtStart = await helper.usersInDb()
  
      await api
        .post('/api/users')
        .send(helper.newUser)
        .expect(201)
        .expect('Content-Type', /application\/json/)
  
      const usersAtEnd = await helper.usersInDb()
      assert.strictEqual(usersAtEnd.length, usersAtStart.length + 1)
  
      const usernames = usersAtEnd.map(u => u.username)
      assert(usernames.includes(helper.newUser.username))
    })

    test('fails with status code 400 if username is missing', async () => {
      await api
        .post('/api/users')
        .send(helper.newUserNull)
        .expect(400)
        .expect('Content-Type', /application\/json/)
    })

    test('fails with status code 400 if username is too short', async () => {
      await api
        .post('/api/users')
        .send(helper.newUserTooShort )
        .expect(400)
        .expect('Content-Type', /application\/json/)
    })

    test('fails with status code 400 if password is too short', async () => {
      await api
        .post('/api/users')
        .send(helper.newUserWithShortPassword)
        .expect(400)
    })
})

after(async () => {
    await mongoose.connection.close()
})

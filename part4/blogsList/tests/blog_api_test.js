const { test, after, beforeEach, describe } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const bcrypt = require('bcryptjs')
const helper = require('./test_helper')
const Blog = require('../models/blog') 
const User = require('../models/user') 
const assert = require('assert')
const app = require('../App.js') 
const api = supertest(app)

describe('GET /api/blogs', () => {
  let token
  beforeEach(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(helper.initialBlogs)

    const user = {
      username: 'testuser',
      name: 'Test User',
      password: 'password'
    }

    await api.post('/api/users').send(user)
    const loginResponse = await api
      .post('/api/login')
      .send({ username: 'testuser', password: 'password' })
    token = loginResponse.body.token 
  })

  test('blogs are returned as json', async () => {
    const response = await api
      .get('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .expect(200)
      .expect('Content-Type', /application\/json/)
    
    assert.strictEqual(response.body.length, helper.initialBlogs.length)
  })

  test('check that posts have the id property instead of _id', async () => {
    const response = await api
      .get('/api/blogs')
      .set('Authorization', `Bearer ${token}`)

    const blogs = response.body
    blogs.forEach(blog => {
      assert.ok(blog.id, 'Blog should have an id property')
      assert.strictEqual(blog._id, undefined, 'Blog should not have an _id property')
    })
  })
})

describe('GET /api/blogs/:id', () => {
  let token
  beforeEach(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(helper.initialBlogs)

    const user = {
      username: 'testuser',
      name: 'Test User',
      password: 'password'
    }

    await api.post('/api/users').send(user)
    const loginResponse = await api
      .post('/api/login')
      .send({ username: 'testuser', password: 'password' })
    token = loginResponse.body.token 
  })

  test('returns a blog with a valid id', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToView = blogsAtStart[0]

    const response = await api
      .get(`/api/blogs/${blogToView.id}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    assert.strictEqual(response.body.id, blogToView.id)
    assert.strictEqual(response.body.title, blogToView.title)
  })

  test('responds with 404 if the blog does not exist', async () => {
    const nonExistingId = await helper.nonExistingId()

    await api
      .get(`/api/blogs/${nonExistingId}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(404)
  })

  test('responds with 400 if the id is invalid', async () => {
    const invalidId = 'invalidId123'

    await api
      .get(`/api/blogs/${invalidId}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(400)
  })
})

describe('POST /api/blogs', () => {
  let token
  beforeEach(async () => {
    await Blog.deleteMany({})

    await api.post('/api/users').send(helper.userTest)
  
    const loginResponse = await api
      .post('/api/login')
      .send({ username: 'testuser', password: 'password' })
    token = loginResponse.body.token 
  
    const userId = loginResponse.body.id
  
    helper.blogTest.userId = userId
  
    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(helper.blogTest)
    
    const blogsAtStart = await helper.blogsInDb()
    assert.strictEqual(blogsAtStart.length, 1)
  })

  test('a valid blog can be added', async () => {
    const blogsAtStart = await helper.blogsInDb()
    await api
      .post('/api/blogs')
      .send(helper.newBlog)
      .set('Authorization', `Bearer ${token}`)
      .expect(201)
      .expect('Content-Type', /application\/json/)
      .catch((err) => console.error(err))

      const blogsAtEnd = await helper.blogsInDb()
      const response = await api.get('/api/blogs')
      assert.strictEqual(blogsAtEnd.length, blogsAtStart.length+1)
  })

  test('a valid blog without likes defaults likes to 0', async () => {
    const response = await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(helper.newBlogWithoutLikes)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    assert.strictEqual(response.body.likes, 0) 
  })

  test('fails with status code 400 if title or url are missing', async () => {
    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(helper.newBlogMissingTitle)
      .expect(400)  
      .expect('Content-Type', /application\/json/)

    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(helper.newBlogMissingUrl)
      .expect(400)  
      .expect('Content-Type', /application\/json/)
  })
})

describe('DELETE /api/blogs/:id', () => {
  let token
  beforeEach(async () => {
    await Blog.deleteMany({})

    await api.post('/api/users').send(helper.userTest)
  
    const loginResponse = await api
      .post('/api/login')
      .send({ username: 'testuser', password: 'password' })
    token = loginResponse.body.token 
  
    const userId = loginResponse.body.id
  
    helper.blogTest.userId = userId
  
    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(helper.blogTest)
    
    const blogsAtStart = await helper.blogsInDb()
    assert.strictEqual(blogsAtStart.length, 1)
  })
  
  test('a blog can be deleted', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[0] 
  
    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(204) 
  
    const blogsAtEnd = await helper.blogsInDb()
    assert.strictEqual(blogsAtEnd.length, blogsAtStart.length - 1) 
  
    const ids = blogsAtEnd.map(blog => blog.id)
    assert.ok(!ids.includes(blogToDelete.id)) 
  })
  
  test('responds with 404 if the blog does not exist', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const nonExistingId = await helper.nonExistingId() 

    await api
      .delete(`/api/blogs/${nonExistingId}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(404)

    const blogsAtEnd = await helper.blogsInDb()
    assert.strictEqual(blogsAtStart.length, blogsAtEnd.length)
  })
})

// describe('PUT /api/blogs/:id', () => {
//   beforeEach(async () => {
//     await Blog.deleteMany({})
//     await Blog.insertMany(helper.initialBlogs)
//   })

//   test('updates the likes of a blog', async () => {
//     const blogsAtStart = await helper.blogsInDb()
//     const blogToUpdate = blogsAtStart[0]

//     const newLikes = Math.floor(Math.random() * 20)

//     await api
//       .put(`/api/blogs/${blogToUpdate.id}`)
//       .send({ likes: newLikes }) 
//       .expect(200) 
//       .expect('Content-Type', /application\/json/)

//     const updatedBlog = await Blog.findById(blogToUpdate.id)
//     assert.strictEqual(updatedBlog.likes, newLikes) 
//   })

//   test('responds with 404 if the blog does not exist', async () => {
//     const nonExistingId = await helper.nonExistingId() 

//     await api
//       .put(`/api/blogs/${nonExistingId}`)
//       .send({ likes: Math.floor(Math.random() * 20) }) 
//       .expect(404)
//   })

//   test('responds with 400 if invalid data is provided', async () => {
//     const blogsAtStart = await helper.blogsInDb()
//     const blogToUpdate = blogsAtStart[0]

//     await api
//       .put(`/api/blogs/${blogToUpdate.id}`)
//       .send({ likes: 'notANumber' }) 
//       .expect(400)

//     await api
//       .put(`/api/blogs/${blogToUpdate.id}`)
//       .send({ likes: -5 }) 
//       .expect(400)
//   })
// })

  after(async () => {
    await mongoose.connection.close()
  })
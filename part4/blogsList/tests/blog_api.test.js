const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper.js')
const Blog = require('../models/blog.js') 
const User = require('../models/user.js') 
const app = require('../App.js') 
const api = supertest(app)

describe('GET /api/blogs', () => {
  let token

  beforeEach(async () => {
    await Blog.deleteMany({})

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
    expect(token).toBeDefined() 
    
    await Blog.insertMany(helper.initialBlogs) 
  })

  test('blogs are returned as json', async () => {
    const response = await api
      .get('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    expect(response.body.length).toBe(helper.initialBlogs.length)
  })

  test('check that posts have the id property instead of _id', async () => {
    const response = await api
      .get('/api/blogs')
      .set('Authorization', `Bearer ${token}`)

    const blogs = response.body
    blogs.forEach(blog => {
      expect(blog.id).toBeDefined()
      expect(blog._id).toBeUndefined()
    })
  })
})

describe('GET /api/blogs/:id', () => {
  let token

  beforeEach(async () => {
    await Blog.deleteMany({})

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
    expect(token).toBeDefined() 
    
    await Blog.insertMany(helper.initialBlogs) 
  })

  test('returns a blog with a valid id', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToView = blogsAtStart[0]

    const response = await api
      .get(`/api/blogs/${blogToView.id}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    expect(response.body.id).toBe(blogToView.id)
    expect(response.body.title).toBe(blogToView.title)
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
    expect(blogsAtStart.length).toBe(1)
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
      expect(blogsAtEnd.length).toBe(blogsAtStart.length+1)
  })

  test('a valid blog without likes defaults likes to 0', async () => {
    const response = await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(helper.newBlogWithoutLikes)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    expect(response.body.likes).toBe(0) 
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
    expect(blogsAtStart.length).toBe(1)
  })
  
  test('a blog can be deleted', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[0] 
  
    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(204) 
  
    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd.length).toBe(blogsAtStart.length - 1) 
  
    const ids = blogsAtEnd.map(blog => blog.id)
    expect(blogToDelete.id).toBeDefined() 
  })
  
  test('responds with 404 if the blog does not exist', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const nonExistingId = await helper.nonExistingId() 

    await api
      .delete(`/api/blogs/${nonExistingId}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(404)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtStart.length).toBe(blogsAtEnd.length)
  })
})

describe('PUT /api/blogs/:id', () => {
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
    expect(blogsAtStart.length).toBe(1)

    await Blog.insertMany(helper.initialBlogs) 
  })

  test('updates the likes of a blog', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToUpdate = blogsAtStart[0]

    const newLikes = Math.floor(Math.random() * 20)

    await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send({ likes: newLikes }) 
      .set('Authorization', `Bearer ${token}`)
      .expect(200) 
      .expect('Content-Type', /application\/json/)

    const updatedBlog = await Blog.findById(blogToUpdate.id)
    expect(updatedBlog.likes).toBe(newLikes) 
  })

  test('responds with 404 if the blog does not exist', async () => {
    const nonExistingId = await helper.nonExistingId() 

    await api
      .put(`/api/blogs/${nonExistingId}`)
      .send({ likes: Math.floor(Math.random() * 20) }) 
      .set('Authorization', `Bearer ${token}`)
      .expect(404)
  })

  test('responds with 400 if invalid data is provided', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToUpdate = blogsAtStart[0]

    await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send({ likes: 'notANumber' }) 
      .set('Authorization', `Bearer ${token}`)
      .expect(400)

    await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send({ likes: -5 }) 
      .set('Authorization', `Bearer ${token}`)
      .expect(400)
  })
})

afterAll(async () => {
  await mongoose.connection.close()
})
const bcrypt = require('bcryptjs')
const usersRouter = require('express').Router()
const User = require('../models/user')
const Blog = require('../models/blog')

usersRouter.get('/', async (request, response) => {
  try {
    const users = await User
      .find({})
      .populate('blogs', { title: 1, author: 1, url: 1 }) 
    
    response.json(users)
  } catch (error) {
    response.status(500).json({ error: 'Internal server error' })
  }
})

usersRouter.post('/', async (request, response) => {
  const { username, name, password } = request.body

  if (!password || password.length < 3) {
    return response.status(400).json({
      error: 'Password must be at least 3 characters long',
    })
  }

  if (!username || username.length < 3) {
    return response.status(400).json({
      error: 'Username must be at least 3 characters long',
    })
  }

  try {
    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)

    const user = new User({
      username,
      name,
      passwordHash,
    })

    const savedUser = await user.save()

    const blogs = await Blog.find({})
    if (blogs.length > 0) {
      const blog = blogs[0] 
      user.blogs = user.blogs.concat(blog._id)
      await user.save()
    }

    response.status(201).json(savedUser)
  } catch (error) {
    if (error.name === 'ValidationError') {
      return response.status(400).json({ error: error.message })
    } else if (error.code === 11000) { 
      return response.status(400).json({ error: 'Username must be unique' })
    } else {
      return response.status(500).json({ error: 'Internal server error' })
    }
  }
})

module.exports = usersRouter
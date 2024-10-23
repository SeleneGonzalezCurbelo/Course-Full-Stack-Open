const Blog = require('../models/blog')
const mongoose = require('mongoose')
const User = require('../models/user') 

const initialBlogs = [
    {
      title: "Blog 1",
      author: "John Doe",
      url: "http://example.com/first",
      likes: 3,
      user: "605c72f82f9b2c001f48d3e1"
    },
    {
      title: "Blog 2",
      author: "Jane Doe",
      url: "http://example.com/second",
      likes: 5,
      user: "605c72f82f9b2c001f48d3e1"
    }
  ]

const newBlog = {
    title: 'New Blog Post',
    author: 'New Author',
    url: 'http://example.com/newblog',
    likes: 2,
    user: "671317426e84477ead8c92f1"
}

const newBlogWithoutLikes = {
    title: 'New Blog Post 0',
    author: 'New Author',
    url: 'http://example.com/newblog',
    user: "6712b6fc2f01e916464ae090"
}

const newBlogMissingTitle = {
    author: 'Author without title',
    url: 'http://example.com/missingtitle',
    likes: 1, 
    user: "6712b6fc2f01e916464ae090"
}

const newBlogMissingUrl = {
  title: 'Blog without URL',
  author: 'Author without URL',
  likes: 0,
  user: "6712b6fc2f01e916464ae090"
}

const newUser = {
  username: 'mluukkai',
  name: 'Matti Luukkainen',
  password: 'salainen',
}

const newUserNull = {
  username: null,
  name: 'Matti Luukkainen',
  password: 'salainen',
}

const newUserTooShort  = {
  username: 'a',
  name: 'Matti Luukkainen',
  password: 'salainen',
}

const userTest = {
  username: 'testuser',
  name: 'Test User',
  password: 'password'
}

const blogTest = {
  title: 'Blog for deletion test',
  author: 'Test Author',
  url: 'http://testurl.com',
}

const newUserWithShortPassword = {
  username: 'validUser',
  name: 'Valid User',
  password: 'pw',
}

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(u => u.toJSON())
}

const nonExistingId = async () => {
  const id = new mongoose.Types.ObjectId().toString();
  return id
}

module.exports = {
    initialBlogs,
    newBlog,
    newBlogWithoutLikes,
    newBlogMissingTitle,
    newBlogMissingUrl,
    blogsInDb,
    nonExistingId,
    usersInDb,
    newUser,
    newUserNull,
    newUserTooShort,
    newUserWithShortPassword,
    userTest,
    blogTest
}
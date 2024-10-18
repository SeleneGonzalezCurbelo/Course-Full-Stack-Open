const Blog = require('../models/blog')
const mongoose = require('mongoose')
const User = require('../models/user') 

const initialBlogs = [
    {
      title: "Blog 1",
      author: "John Doe",
      url: "http://example.com/first",
      likes: 3
    },
    {
      title: "Blog 2",
      author: "Jane Doe",
      url: "http://example.com/second",
      likes: 5
    }
  ]

const newBlog = {
    title: 'New Blog Post',
    author: 'New Author',
    url: 'http://example.com/newblog',
    likes: 2
}

const newBlogWithoutLikes = {
    title: 'New Blog Post 0',
    author: 'New Author',
    url: 'http://example.com/newblog'
}

const newBlogMissingTitle = {
    author: 'Author without title',
    url: 'http://example.com/missingtitle',
    likes: 1
}

const newBlogMissingUrl = {
  title: 'Blog without URL',
  author: 'Author without URL',
  likes: 0
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
    usersInDb
}
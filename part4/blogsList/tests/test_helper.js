const blog = require('../models/blog')

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
  ];

const newBlog = {
    title: 'New Blog Post',
    author: 'New Author',
    url: 'http://example.com/newblog',
    likes: 2
}

const newBlogWithoutLikes = {
    title: 'New Blog Post',
    author: 'New Author',
    url: 'http://example.com/newblog'
}

module.exports = {
    initialBlogs,
    newBlog,
    newBlogWithoutLikes
}
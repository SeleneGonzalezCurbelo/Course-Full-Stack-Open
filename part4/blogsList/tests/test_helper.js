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

module.exports = {
    initialBlogs
}
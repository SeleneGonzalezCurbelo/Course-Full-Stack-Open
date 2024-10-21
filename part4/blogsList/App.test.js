const listHelper = require('./utils/list_helper')

describe('Dummy function tests', () => {
  test('dummy returns one', () => {
    const blogs = []
    const result = listHelper.dummy(blogs)
    expect(result).toBe(1)
  })
})

describe('total likes', () => {
  const listWithOneBlog = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
      likes: 5,
      __v: 0
    }
  ]

  const listWithMultipleBlogs = [
    {
      _id: "5a422a851b54a676234d17f7",
      title: "React patterns",
      author: "Michael Chan",
      url: "https://reactpatterns.com/",
      likes: 7,
      __v: 0
    },
    {
      _id: "5a422aa71b54a676234d17f8",
      title: "Go To Statement Considered Harmful",
      author: "Edsger W. Dijkstra",
      url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
      likes: 5,
      __v: 0
    },
    {
      _id: "5a422b3a1b54a676234d17f9",
      title: "Canonical string reduction",
      author: "Edsger W. Dijkstra",
      url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
      likes: 12,
      __v: 0
    }
  ]

  test('of empty list of zero', () => {
    const result = listHelper.totalLikes([])
    expect(result).toBe(0)
  })

  test('when list has only one blog, equals the likes of that', () => {
    const result = listHelper.totalLikes(listWithOneBlog)
    expect(result).toBe(5)
  })

  test('of a bigger list is calculated right', () => {
    const result = listHelper.totalLikes(listWithMultipleBlogs)
    expect(result).toBe(24)
  })  
})

describe('favorite blog', () => {
  const blogs = [
    {
      _id: '1',
      title: 'Blog 1',
      author: 'Author 1',
      url: 'http://example1.com',
      likes: 10,
      __v: 0
    },
    {
      _id: '2',
      title: 'Blog 2',
      author: 'Author 2',
      url: 'http://example2.com',
      likes: 20,
      __v: 0
    },
    {
      _id: '3',
      title: 'Blog 3',
      author: 'Edsger W. Dijkstra',
      url: 'http://example3.com',
      likes: 12,
      __v: 0
    }
  ]

  test('when list has multiple blogs, return the one with the most likes', () => {
    const result = listHelper.favoriteBlog(blogs)
    expect(result).toEqual({
      title: 'Blog 2',
      author: 'Author 2',
      likes: 20
    })
  })

  test('when list is empty, return null', () => {
    const result = listHelper.favoriteBlog([])
    expect(result).toBe(null)
  })

  test('when list has one blog, return that blog in the correct format', () => {
    const oneBlogList = [blogs[0]]
    const result = listHelper.favoriteBlog(oneBlogList)
    expect(result).toEqual({
      title: 'Blog 1',
      author: 'Author 1',
      likes: 10
    })
  })
})

describe('most blogs', () => {
  const blogs = [
    {
      _id: '1',
      title: 'Blog 1',
      author: 'Author 1',
      url: 'http://example1.com',
      likes: 10,
      __v: 0
    },
    {
      _id: '2',
      title: 'Blog 2',
      author: 'Author 2',
      url: 'http://example2.com',
      likes: 20,
      __v: 0
    },
    {
      _id: '3',
      title: 'Blog 3',
      author: 'Author 2',
      url: 'http://example3.com',
      likes: 12,
      __v: 0
    }
  ]

  test('author with most blogs', () => {
    const result = listHelper.mostBlogs(blogs)
    expect(result).toEqual({
      author: 'Author 2',
      blogs: 2
    })
  })

  test('when list is empty, return null', () => {
    const result = listHelper.mostBlogs([])
    expect(result).toBe(null)
  })

  test('when list has one blog, return that author with one blog', () => {
    const oneBlogList = [blogs[0]]
    const result = listHelper.mostBlogs(oneBlogList)
    expect(result).toEqual({
      author: 'Author 1',
      blogs: 1
    })
  })
})

describe('most likes', () => {
  const blogs = [
    {
      _id: '1',
      title: 'Blog 1',
      author: 'Author 1',
      url: 'http://example1.com',
      likes: 10,
      __v: 0
    },
    {
      _id: '2',
      title: 'Blog 2',
      author: 'Author 2',
      url: 'http://example2.com',
      likes: 20,
      __v: 0
    },
    {
      _id: '3',
      title: 'Blog 3',
      author: 'Author 1',
      url: 'http://example3.com',
      likes: 12,
      __v: 0
    },
    {
      _id: '4',
      title: 'Blog 4',
      author: 'Author 2',
      url: 'http://example3.com',
      likes: 12,
      __v: 0
    }
  ]

  test('when list has multiple blogs, returns the author with the most likes', () => {
    const result = listHelper.mostLikes(blogs)
    expect(result).toEqual({
      author: 'Author 2',
      likes: 32
    })
  })

  test('when list is empty, return null', () => {
    const result = listHelper.mostLikes([])
    expect(result).toBe(null)
  })
})
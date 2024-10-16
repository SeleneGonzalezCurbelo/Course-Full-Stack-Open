const { test, describe } = require('node:test'); 
const assert = require('node:assert'); 
const listHelper = require('./utils/list_helper'); 

describe('Dummy function tests', () => {
  test('dummy returns one', () => {
    const blogs = [];
    const result = listHelper.dummy(blogs);
    assert.strictEqual(result, 1);
  });
});

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
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
      likes: 5,
      __v: 0
    },
    {
      _id: '5a422aa71b54a676234d17f9',
      title: 'Go To Statement Considered Harmful 2',
      author: 'Edsger W. Dijkstra',
      url: 'https://example.com/blog',
      likes: 3,
      __v: 0
    },
    {
      _id: '5a422aa71b54a676234d17f10',
      title: 'Go To Statement Considered Harmful 3',
      author: 'Edsger W. Dijkstra',
      url: 'https://example2.com/blog',
      likes: 7,
      __v: 0
    }
  ];

  test('when list has only one blog, equals the likes of that', () => {
    const result = listHelper.totalLikes(listWithOneBlog)
    assert.strictEqual(result, 5)
  })

  test('when list has multiple blogs, equals the sum of likes', () => {
    const result = listHelper.totalLikes(listWithMultipleBlogs);
    assert.strictEqual(result, 15); 
  });

  test('when list is empty, equals zero', () => {
    const result = listHelper.totalLikes([]);
    assert.strictEqual(result, 0);
  });
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
      title: 'Canonical string reduction',
      author: 'Edsger W. Dijkstra',
      url: 'http://example3.com',
      likes: 12,
      __v: 0
    }
  ];

  test('when list has multiple blogs, return the one with the most likes', () => {
    const result = listHelper.favoriteBlog(blogs);
    assert.deepStrictEqual(result, {
      title: 'Blog 2',
      author: 'Author 2',
      likes: 20
    });
  });

  test('when list is empty, return null', () => {
    const result = listHelper.favoriteBlog([]);
    assert.strictEqual(result, null);
  });

  test('when list has one blog, return that blog in the correct format', () => {
    const oneBlogList = [blogs[0]];
    const result = listHelper.favoriteBlog(oneBlogList);
    assert.deepStrictEqual(result, {
      title: 'Blog 1',
      author: 'Author 1',
      likes: 10
    });
  });
});
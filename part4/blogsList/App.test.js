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

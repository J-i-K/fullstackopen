const listHelper = require('../utils/list_helper')

test('dummy returns one', () => {
  expect(listHelper.dummy([])).toBe(1)
})

describe('total likes', () => {
  test('empty list returns zero', () => {
    expect(listHelper.totalLikes([])).toBe(0)
  })
  test('list with one entry, with 0 likes results in 0', () => {
    expect(listHelper.totalLikes([{likes: 0}])).toBe(0)
  })
  test('list with 1 blog with one like results in 1', () => {
    expect(listHelper.totalLikes([{likes: 1}])).toBe(1)
  })
  test('list with one entry, without likes results in 0', () => {
    expect(listHelper.totalLikes([{}])).toBe(0)
  })
  test('list with 1 blog with five likes results in 5', () => {
    expect(listHelper.totalLikes([{likes: 5}])).toBe(5)
  })
  test('total number of 5 likes for 5 blogs is 25', () => {
    const blogs = [{likes: 5},{likes: 5},{likes: 5},{likes: 5},{likes: 5}]
    expect(listHelper.totalLikes(blogs)).toBe(25)
  })
  test('total number of 5 likes for five blogs and 0 likes for one blog is 25', () => {
    const blogs = [{likes: 5},{likes: 5},{likes: 5},{likes: 5},{likes: 5}, {likes: 0}]
    expect(listHelper.totalLikes(blogs)).toBe(25)
  })
})

describe('favoriteBlog', () => {
  test('the object with highest value of likes from an empty list is {}', () => {
    expect(listHelper.objectWihHighestValueFromListOfObjects([], 'likes')).toEqual({})
  })
  test('the object with highest value of likes from a list with 1 object is {likes: 1}', () => {
    expect(listHelper.objectWihHighestValueFromListOfObjects([{likes: 1}], 'likes')).toEqual({likes: 1})
  })
  test('the object with highest value of likes from a list with 5 objects is {likes: 10}', () => {
    expect(listHelper.objectWihHighestValueFromListOfObjects([{likes: 1}, {likes: 3}, {likes: 4}, {likes: 5}, {likes: 10}], 'likes')).toEqual({likes: 10})
  })
  test('the object with highest value of likes from a list with 5 objects where one is missing the likes attribute is {likes: 10}', () => {
    expect(listHelper.objectWihHighestValueFromListOfObjects([{likes: 1}, {likes: 3}, {likes: 4}, {}, {likes: 10}], 'likes')).toEqual({likes: 10})
  })
  test('the object with highest value of likes from a list with 5 objects where one a negative number of likes is {likes: 10}', () => {
    expect(listHelper.objectWihHighestValueFromListOfObjects([{likes: 1}, {likes: 3}, {likes: 4}, {likes: -1}, {likes: 10}], 'likes')).toEqual({likes: 10})
  })
})

describe('mostBlogs', () => {
  test('the authors with most blogs', () => {
    expect(listHelper.attrFromListOfObjectsWithHighestCountOfObjects([{author: 1}, {author: 2}, {author: 3}, {author: 1}], 'author')).toEqual([{author: 1, count: 2}])
  })
  test('the authors with most blogs where list is empty returns an empty list', () => {
    expect(listHelper.attrFromListOfObjectsWithHighestCountOfObjects([], 'author')).toEqual([])
  })
  test('the authors with most blogs where some objects lack the author attribute', () => {
    expect(listHelper.attrFromListOfObjectsWithHighestCountOfObjects([{author: 1}, {author: 2}, {author: 3},{author: 1}, {authror: 1}], 'author')).toEqual([{author: 1, count: 2}])
  })
  test('the authors with most blogs where multiple are returned', () => {
    expect(listHelper.attrFromListOfObjectsWithHighestCountOfObjects([{author: 1}, {author: 2}, {author: 3}, {authror: 1}], 'author')).toEqual([{author: 1, count: 1}, {author: 2, count: 1}, {author: 3, count: 1}])
  })
})

describe('mostLikes', () => {
  test('the authors with most likes', () => {
    expect(listHelper.attrFromListOfObjectsWithHighestCountOfAttr2([{author: 1, likes: 1}, {author: 2, likes: 2}, {author: 3, likes:3}, {author: 3, likes: 3}], 'author', 'likes')).toEqual([{author: 3, likes: 6}])
  })
  test('the authors with most blogs where list is empty returns an empty list', () => {
    expect(listHelper.attrFromListOfObjectsWithHighestCountOfAttr2([], 'author', 'likes')).toEqual([])
  })
  test('the authors with most blogs where some objects lack the likes attribute', () => {
    expect(listHelper.attrFromListOfObjectsWithHighestCountOfAttr2([{author: 1, likes: 1}, {author: 2, likes: 2}, {author: 3}], 'author', 'likes')).toEqual([{author: 2, likes: 2}])
  })
  test('the authors with most blogs where some objects lack the author attribute', () => {
    expect(listHelper.attrFromListOfObjectsWithHighestCountOfAttr2([{author: 1, likes: 1}, {author: 2, likes: 2}, {likes: 30}], 'author', 'likes')).toEqual([{author: 2, likes: 2}])
  })
  test('the authors with most blogs where multiple are returned', () => {
    expect(listHelper.attrFromListOfObjectsWithHighestCountOfAttr2([{author: 1, likes: 1}, {author: 2, likes: 2}, {author: 3, likes:2}], 'author', 'likes')).toEqual([{author: 2, likes: 2}, {author: 3, likes: 2}])
  })
})
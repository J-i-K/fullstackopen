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
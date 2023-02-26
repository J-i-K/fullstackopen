const { totalLikes } = require('../utils/list_helper')
const listHelper = require('../utils/list_helper')

test('dummy returns one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  expect(result).toBe(1)
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
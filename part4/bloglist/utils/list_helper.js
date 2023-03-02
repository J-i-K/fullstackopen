const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.map(blog => blog.likes)
    .reduce((a, b) => a + b, 0) || 0
}

const objectWihHighestValueFromListOfObjects = (list, attr) => {
  console.log(list, attr)
  let max = 0
  let objectIndex = null
  for (let obj in list) {
    console.log(list[obj])
    if (list[obj][attr] > max) {
      max = list[obj][attr]
    }
  }
  console.log(max)
  for (let obj in list) {
    if (list[obj][attr] === max) {
      objectIndex = obj
    }
  }
  return list[objectIndex] || {}
}

module.exports = { dummy, totalLikes, objectWihHighestValueFromListOfObjects}
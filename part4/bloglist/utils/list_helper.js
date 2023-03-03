const dummy = () => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.map(blog => blog.likes)
    .reduce((a, b) => a + b, 0) || 0
}

const objectWihHighestValueFromListOfObjects = (list, attr) => {
  let max = 0
  let objectIndex = null
  for (let obj in list) {
    if (list[obj][attr] > max) {
      max = list[obj][attr]
    }
  }
  for (let obj in list) {
    if (list[obj][attr] === max) {
      objectIndex = obj
    }
  }
  return list[objectIndex] || {}
}

const attrFromListOfObjectsWithHighestCountOfObjects = (list, attr) => {
  let max = 0
  let attrs = [...new Set(list.map(object => object[attr]))].filter(object => typeof object !== 'undefined')
  let attrsOut = []
  for (let x in attrs) {
    let obj = {}
    obj[attr] = attrs[x]
    obj['count'] = list.filter(object => object[attr] === attrs[x]).length
    attrsOut.push(obj)
  }
  for (let x in attrsOut) {
    if (attrsOut[x].count > max) {
      max = attrsOut[x].count
    }
  }
  return attrsOut.filter(object => object.count === max)
}

const attrFromListOfObjectsWithHighestCountOfAttr2 = (list, attr, attr2) => {
  let max = 0
  let attrs = [...new Set(list.map(object => object[attr]))].filter(object => typeof object !== 'undefined')
  let attrsOut = []
  for (let x in attrs) {
    let obj = {}
    obj[attr] = attrs[x]
    obj[attr2] = list.filter(object => object[attr] === attrs[x]).map(object => object[attr2]).reduce((a, b) => a + b, 0) || 0
    attrsOut.push(obj)
  }
  for (let x in attrsOut) {
    if (attrsOut[x][attr2] > max) {
      max = attrsOut[x][attr2]
    }
  }
  return attrsOut.filter(object => object[attr2] === max)
}

module.exports = { dummy, totalLikes, objectWihHighestValueFromListOfObjects, attrFromListOfObjectsWithHighestCountOfObjects, attrFromListOfObjectsWithHighestCountOfAttr2 }
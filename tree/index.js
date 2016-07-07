
// const blessed = require('blessed')

class Node {
  constructor (type, attr, children) {
    this.type = type.replace(/^./, ch => ch.toUpperCase())
    this.attr = attr || {}
    this.children = children || []
    this.parent = null
  }
}

// function createBlessed (type, attr) {
//   type = type.replace(/^./, ch => ch.toUpperCase())
//   if (blessed[type]) {
//     return blessed[type](attr)
//   }
//
//   throw new Error('unrecognized type')
// }

module.exports = function b (type, attr, children) {
  let node = new Node(type, attr, children)
  node.children.forEach(child => {
    child.parent = node
  })
  return node
}

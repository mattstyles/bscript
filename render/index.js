
const blessed = require('blessed')
const {walk} = require('../tree/util')

/**
 * Creates the raw blessed instance from attributes
 */
function createElement (type, attr) {
  if (blessed[type]) {
    return blessed[type](attr)
  }

  throw new Error('unrecognized type')
}

/**
 * Mutates the node by appending id and an actual element
 */
function create (node) {
  const {type, parent, attr} = node
  node.element = createElement(type, attr)

  if (!parent || !parent.element) {
    return
  }

  parent.element.append(node.element)
}

/**
 * Creates a new id based from the parent
 * id's should not necessarily denote hierarchy so just use a counter,
 * does the advantage of each node having its own number id as well as
 * a longer id denoting path from root to node
 */
function attachId (key) {
  let count = 0
  return node => {
    let id = node.parent ? node.parent._id + '$' : key + '$' || '$'
    id += count++ + '.'
    node._id = id
  }
}

/**
 * Renders elements
 * Should cache last tree, checks diffs and render a patch based
 * from the diff
 * For now just create a new tree of elements
 */
module.exports = function render (root, screen) {
  let createId = attachId()
  walk(node => {
    createId(node)
    create(node)
  }, root)
  screen.append(root.element)
  screen.render()
  return root
}

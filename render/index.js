
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
 * Renders elements
 * Should cache last tree, checks diffs and render a patch based
 * from the diff
 * For now just create a new tree of elements
 */
module.exports = function render (root, screen) {
  let count = 0
  walk(node => {
    let id = node.parent ? node.parent._id + '$' : '$'
    id += count++ + '.'
    node._id = id
    create(node)
  }, root)
  screen.append(root.element)
  screen.render()
  return root
}

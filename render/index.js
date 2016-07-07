
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
  const {type, parent, attr, children} = node

  if (typeof type === 'function') {
    let component = type(Object.assign(attr, {
      children
    }))
    node.element = createElement(component.type, component.attr)
  } else {
    node.element = createElement(type, attr)
  }

  if (!parent || !parent.element) {
    return
  }

  parent.element.append(node.element)

  // Attach unique id
}

/**
 * Renders elements
 * Should cache last tree, checks diffs and render a patch based
 * from the diff
 * For now just create a new tree of elements
 */
module.exports = function render (root, screen) {
  root._id = '$1'
  walk(create, root)
  screen.append(root.element)
  screen.render()
  console.log(root)
  return root
}

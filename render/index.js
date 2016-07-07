
const blessed = require('blessed')
const {walk2} = require('../tree/util')

function createElement (type, attr) {
  if (blessed[type]) {
    return blessed[type](attr)
  }

  console.log(type)
  throw new Error('unrecognized type')
}

function append (child, parent) {
  if (typeof child.type === 'function') {
    child.element = child.type(child.attr)
  }
  child.element = createElement(child.type, child.attr)
  if (!parent && !parent.element.append) {
    return
  }

  if (parent.append) {
    parent.append(child.element)
    return
  }

  parent.element.append(child.element)
}

/**
 * Renders elements
 * Should cache last tree, checks diffs and render a patch based
 * from the diff
 * For now just create a new tree of elements
 */
module.exports = function render (root, screen) {
  walk2(append, root, screen)
  screen.render()
  return root
}

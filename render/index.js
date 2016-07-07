
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

let previous = null

/**
 * Renders elements
 * Should cache last tree, checks diffs and render a patch based
 * from the diff
 * For now just create a new tree of elements
 */
module.exports = function render (root, screen) {
  let createId = attachId()
  // Create new tree
  if (!previous) {
    walk(node => {
      createId(node)
      create(node)
    }, root)
    screen.append(root.element)
    previous = root
  } else {
    // This is a fake walk of the tree, which we'd need to do to
    // diff the old tree
    walk(node => {
      createId(node)
      // create(node)
    }, root)
    // previous.element.setContent('count:' + count++)

    // Update based on a manual diff from example/frame.js
    previous.element.setContent(root.attr.content)
  }

  // Destroy old tree - does not work, still drops the frames
  // walk(node => {
  //   node.element.destroy()
  // }, root)

  // console.log(previous ? previous.attr.content : 'null', ':', root.attr.content)
  // previous = root

  screen.render()
  return root
}

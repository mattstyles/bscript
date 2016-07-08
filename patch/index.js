
const blessed = require('blessed')

const R_NODE_MEMBERS = /\/type$|\/attr$|\/children$/
const R_IGNORE = /\/element$/
const R_MEMBER = /[^\/]*$/
const R_NODE_PARENT = /\/children\/[0-9]+$/

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
function create (node, parent) {
  const {type, attr} = node
  node.element = createElement(type, Object.assign({}, attr))

  if (!parent) {
    // parent.append(node.element)
    return
  }

  parent.element.append(node.element)
}

/**
 * Strips bscript-node members from the path to reveal the path to
 * the actual node rather to a node member
 */
function generatePath (path) {
  return path.replace(R_NODE_MEMBERS, '') || '_'
}

/**
 * Justs grabs the end of the path, which should be the member that
 * needs to be manipulated
 */
function extPath (path) {
  return path.match(R_MEMBER)[0]
}

/**
 * Walks the tree and returns the requested node
 */
function getNode (path, tree) {
  if (path === '_') {
    return tree
  }

  return path
    .split('/')
    .reduce((node, segment) => {
      return node[segment]
    }, tree)
}

/**
 * Walks the tree and returns the parent
 */
function getParentNode (path, tree) {
  if (path === '_') {
    return null
  }

  return getNode(
    path.replace(R_NODE_PARENT, '')
  )
}

/**
 * Mutative clone of b to a
 */
function objectClone (a, b) {
  Object.keys(b).forEach(key => {
    a[key] = b[key]
  })
}

/**
 *
 */
module.exports = function reconcile (diff, root, screen) {
  let additions = new Map()

  // @TODO forEach perf, consider while
  diff.forEach(d => {
    if (R_IGNORE.test(d.path)) {
      return
    }

    if (d.op === 'add') {
      let path = generatePath(d.path)
      let obj = additions.get(path) || {}
      obj[extPath(d.path)] = d.value
      additions.set(path, obj)
    }
  })

  screen.debug(additions)

  additions.forEach((node, path) => {
    let parent = getParentNode(path, root)
    let stateNode = getNode(path, root)

    // Clone add node props to the node from the state tree
    objectClone(stateNode, Object.assign({}, node))

    // Mutate the state tree to add the element
    create(stateNode, parent)

    if (!parent) {
      screen.append(stateNode.element)
    }
  })
}


const blessed = require('blessed')
const exists = require('exists')
const {walk2} = require('bscript-tree/util')

const R_NODE_MEMBERS = /\/type$|\/attr$|\/attr\/.+$|\/children$/
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
      if (segment === '') {
        return node
      }

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
 * Handle additions to the state tree.
 * Mutatates root param.
 */
function handleAdditions (root, screen) {
  // Returns iterator to pass through Map.forEach (kv pair)
  return (node, path) => {
    let parent = getParentNode(path, root)
    let stateNode = getNode(path, root)

    // Clone add node props to the node from the state tree
    objectClone(stateNode, Object.assign({}, node))

    // Mutate the state tree to add the element
    create(stateNode, parent)

    // Create all children of the new node
    walk2((node, parent) => {
      create(node, parent)
    }, stateNode)

    if (!parent) {
      screen.append(stateNode.element)
    }
  }
}

/**
 * Creates a key-value addition record given a map of records and a
 * diff object to use.
 * Returns key-value tuple.
 */
function createAdditionRecord (map, diff) {
  let path = generatePath(diff.path)
  let obj = map.get(path) || {}

  // Append diff to the addition record
  obj[extPath(diff.path)] = diff.value
  return [path, obj]
}

/**
 * Handle replace mutation
 */
function handleReplace (root, diff) {
  let path = generatePath(diff.path)
  let {attr, element} = getNode(path, root)
  let member = extPath(diff.path)

  if (member === 'content') {
    element.setContent(diff.value)
    attr[member] = diff.value
    return
  }

  // Attempt to update element attr
  if (exists(attr[member])) {
    attr[member] = diff.value
  }

  if (exists(element[member])) {
    element[member] = diff.value
  }
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
      additions.set(...createAdditionRecord(additions, d))
      return
    }

    if (d.op === 'replace') {
      handleReplace(root, d)
      return
    }
  })

  additions.forEach(handleAdditions(root, screen))
}

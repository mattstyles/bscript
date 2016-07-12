
const {walk2} = require('bscript-tree/util')
const {
  objectClone,
  getNode,
  getParentNode,
  generatePath,
  extPath
} = require('./util')
const {create} = require('./create')

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
 * Handle additions to the state tree.
 * Mutatates root param.
 */
function handleAdditions (root, screen) {
  // Returns iterator to pass through Map.forEach (kv pair)
  return (node, path) => {
    let parent = getParentNode(path, root)
    let stateNode = getNode(path, root)

    // Clone add node props to the node from the state tree
    objectClone(stateNode, node)

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

module.exports = {
  createAdditionRecord,
  handleAdditions
}

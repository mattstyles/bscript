
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

    // If there is a state node then this is the first addition
    // After that there won't be a state node as it'll be new and the
    // addition will be a child
    if (stateNode) {
      // Clone add node props to the node from the state tree
      objectClone(stateNode, node)

      // Mutate the state tree to add the element
      create(stateNode, parent)

      // Create all children of the new node
      stateNode.children.forEach(child => {
        create(child, stateNode)
      })

      if (!parent) {
        screen.append(stateNode.element)
      }
    } else {
      // Double check that this is a child node that is being added
      if (/children/.test(path)) {
        Object.keys(node).forEach(key => {
          create(node[key], parent)

          // Create all children of the new node
          node[key].children.forEach(child => {
            create(child, node[key])
          })
        })
      }
    }
  }
}

module.exports = {
  createAdditionRecord,
  handleAdditions
}

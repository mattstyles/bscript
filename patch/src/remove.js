
const {
  generatePath,
  getNode,
  getParentNode
} = require('./util')

function handleRemove (root, diff) {
  if (root === '_') {
    // Assume that we can not remove the root
    return
  }

  let path = generatePath(diff.path)
  let node = getNode(path, root)
  let parent = getParentNode(path, root)

  parent.element.remove(node)
  node.element.detach()
}

module.exports = {
  handleRemove
}

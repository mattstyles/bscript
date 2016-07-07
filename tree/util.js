
/**
 * Depth first pre-order iterator
 */
exports.walk = function walk (fn, node) {
  if (fn) {
    fn(node)
  }
  if (node.children && node.children.length) {
    node.children.forEach(child => walk(fn, child))
  }
}

exports.walk2 = function walk2 (fn, node, parent) {
  if (fn) {
    fn(node, parent)
  }
  if (node.children && node.children.length) {
    node.children.forEach(child => walk2(fn, child, node))
  }
}

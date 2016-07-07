
const tape = require('tape')
const b = require('./')

function count (tree) {
  let count = 0

  function walk (node) {
    count++
    if (node.children && node.children.length) {
      node.children.forEach(walk)
    }
  }

  walk(tree)
  return count
}

tape('b should create a single node', t => {
  let root = b('element')
  t.ok(root.type === 'Element', 'b should capitalize types')
  t.end()
})

tape('b should create a tree of nodes', t => {
  let tree = b('element', {}, [
    b('element')
  ])
  t.equal(count(tree), 2, 'b should recursively create the tree')
  t.end()
})

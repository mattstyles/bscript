
const diff = require('../diff')
const patch = require('../patch')

/**
 * Creates a new id based from the parent
 * id's should not necessarily denote hierarchy so just use a counter,
 * does the advantage of each node having its own number id as well as
 * a longer id denoting path from root to node
 */
function attachId (key) {
  let count = 0
  return (node, parent) => {
    let id = parent ? parent._id + '$' : key + '$' || '$'
    id += count++ + '.'
    node._id = id
  }
}

let stateTree = {}

/**
 * Renders elements
 * Should cache last tree, checks diffs and render a patch based
 * from the diff
 * For now just create a new tree of elements
 */

module.exports = function render (root, screen) {
  // patch(diff(stateTree, root), stateTree, screen)
  screen.render()
  screen.debug('rendering...')
  let d = diff(stateTree, root)
  screen.debug('diff', d)

  patch(d, stateTree, screen)

  screen.render()
  return stateTree
}

// module.exports = function render (root, screen) {
//   // Create new tree
//   if (!previous) {
//     walk2((node, parent) => {
//       createId(node, parent)
//       create(node, parent)
//     }, root)
//     screen.append(root.element)
//     previous = root
//   } else {
//     // This is a fake walk of the tree, which we'd need to do to
//     // diff the old tree
//     // walk2((node, parent) => {
//     //   createId(node, parent)
//     //   // create(node, parent)
//     // }, root)
//     // previous.element.setContent('count:' + count++)
//
//     // console.log(diff(previous, root))
//     let d = diff(previous, root)
//     d.forEach(m => {
//       if (/\/element|_id/.test(m.path)) {
//         screen.debug('skipping element or id mutation')
//         return
//       }
//
//       // Content change
//       if (/\/attr\/content/.test(m.path)) {
//         // @TODO follow path to element
//         previous.element.setContent(m.value)
//         previous.attr.content = m.value
//       }
//     })
//
//     // screen.debug(previous)
//
//     // Update based on a manual diff from example/frame.js
//     // previous.element.setContent(root.attr.content)
//   }
//
//   // Destroy old tree - does not work, still drops the frames
//   // walk(node => {
//   //   node.element.destroy()
//   // }, root)
//
//   // console.log(previous ? previous.attr.content : 'null', ':', root.attr.content)
//   // previous = root
//
//   screen.render()
//   return root
// }

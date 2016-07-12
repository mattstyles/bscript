
const exists = require('exists')
const {
  getNode,
  generatePath,
  extPath
} = require('./util')

/**
 * Handle replace mutation
 */
function handleReplace (root, diff) {
  let path = generatePath(diff.path)
  let node = getNode(path, root)
  let {attr, element} = node
  let member = extPath(diff.path)

  if (member === 'content') {
    element.setContent(diff.value)
    attr[member] = diff.value
    return
  }

  // @TODO diff.path will be a path to a component + a path through
  // its own members, path should strip the component path and leave
  // just the member path, such as /attr/top. For short keys extname
  // gets the `top` key and then we use that to set but for deep keys,
  // such as `style/bg` it no worky
  // @TODO for now just try stripping the `/attr/` and using the
  // other segments
  let keypath = diff.path.replace(/[^.]*\/attr\//, '')
  let keynode = getNode(keypath, element)
  return keynode

  // Attempt to update element attr
  if (exists(attr[member])) {
    attr[member] = diff.value
  }

  if (exists(element[member])) {
    element[member] = diff.value
  }

  // @TODO handle changes to the children array (do these even get
  // reported or are they handled normally?)

  return member
}

module.exports = {
  handleReplace
}

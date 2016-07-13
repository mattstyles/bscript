
const exists = require('exists')
const {
  getNode,
  generatePath,
  extPath
} = require('./util')

function replace (node, diff) {
  let {attr, element} = node

  Object.keys(diff).forEach(key => {
    // node.element[key] = diff[key]
    // Attempt to update element attr
    if (exists(attr[key])) {
      attr[key] = diff[key]
    }

    if (exists(element[key])) {
      element[key] = diff[key]
    }
  })
}

/**
 * Handle replace mutation
 */
function handleReplace (root, diff, screen) {
  let path = generatePath(diff.path)
  let node = getNode(path, root)
  let member = extPath(diff.path)
  let {attr, element} = node

  screen.debug(path, member)

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
  // let keypath = diff.path.replace(/[^.]*\/attr\//, '')
  // let keynode = getNode(keypath, element)

  replace(node, {
    [member]: diff.value
  })

  // Attempt to update element attr
  // if (exists(attr[member])) {
  //   attr[member] = diff.value
  // }
  //
  // if (exists(element[member])) {
  //   element[member] = diff.value
  // }

  // @TODO handle changes to the children array (do these even get
  // reported or are they handled normally?)
}

module.exports = {
  handleReplace,
  replace
}


// Node member keys
const NODE_MEMBERS = /\/type$|\/attr$|\/attr\/.+$|\/children$/

// Keys to ignore
const IGNORE = /\/element$/

// Grabs any member from the end
const MEMBER = /[^\/]*$/

// Grabs the parent of a node
const NODE_PARENT = /children\/[0-9]+$/

const R = {
  NODE_MEMBERS,
  NODE_PARENT,
  IGNORE,
  MEMBER
}

module.exports = R

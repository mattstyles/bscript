
const diff = require('bscript-diff')
const b = require('bscript-tree')

function newRoot () {
  let x = {}
  let y = b('box', 'hello')
  return diff(x, y)
}

function root () {
  let x = b('box', 'hello')
  let y = b('box', 'world')
  return diff(x, y)[0]
}

function deep2 () {
  let x = b('box', [
    b('text', 'hello')
  ])
  let y = b('box', [
    b('text', 'world')
  ])
  return diff(x, y)[0]
}

function deep3 () {
  let x = b('box', [
    b('text', [
      b('span', 'hello'),
      b('span', 'world')
    ])
  ])
  let y = b('box', [
    b('text', [
      b('span', 'hello'),
      b('span', 'foo')
    ])
  ])
  return diff(x, y)[0]
}

function addRoot () {
  let x = b('a')
  let y = b('a', [b('b'), b('c')])
  return diff(x, y)
}

function addDeep2 () {
  let x = b('a', [b('b')])
  let y = b('a', [b('b', [b('c')])])
  return diff(x, y)
}

module.exports = {
  newRoot,
  root,
  deep2,
  deep3,
  addRoot,
  addDeep2
}

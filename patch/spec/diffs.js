
const diff = require('bscript-diff')
const b = require('bscript-tree')

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

module.exports = {
  root,
  deep2,
  deep3
}

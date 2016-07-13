
const render = require('../')
const b = require('../../tree')
const screen = require('./screen')

var tree = b('box', 'Hello', [
  b('box', {
    top: 1,
    content: 'deep'
  })
])

let res = render(tree, screen)

setTimeout(() => {
  render(b('box', 'Hello', [
    b('box', {
      top: 1
    })
  ]), screen)
  // screen.render()
}, 250)

// render(b('box', 'Hello', [
//   b('box', 'World')
// ]), screen)
//
// setTimeout(() => {
//   render(b('box', 'Hello'), screen)
// }, 250)

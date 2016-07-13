
const render = require('../')
const b = require('../../tree')
const screen = require('./screen')

render(b('box', 'Hello', [
  b('box', {
    top: 2,
    content: 'deep'
  }, [
    b('box', {
      top: 1,
      content: 'foo'
    })
  ])
]), screen)

// setTimeout(() => {
//   render(b('box', 'Hello'), screen)
// }, 250)

// render(b('box', 'Hello', [
//   b('box', 'World')
// ]), screen)
//
// setTimeout(() => {
//   render(b('box', 'Hello'), screen)
// }, 250)

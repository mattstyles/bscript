
const render = require('../')
const b = require('../../tree')
const screen = require('./screen')

render(b('box', 'Hello'), screen)

setTimeout(() => {
  render(b('box', 'Hello', [
    b('box', {
      top: 2,
      content: 'World'
    })
  ]), screen)
}, 500)

setTimeout(() => {
  render(b('box', 'Hello', [
    b('box', {
      top: 2,
      content: 'World'
    }),
    b('box', {
      top: 3,
      content: 'Shizzle'
    }, [
      b('box', {
        top: 4,
        content: 'nizzle'
      })
    ])
  ]), screen)
}, 1000)

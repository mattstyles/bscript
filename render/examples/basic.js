
const render = require('../')
const b = require('../../tree')
const screen = require('./screen')

render(b('box', 'Hello'), screen)

setTimeout(() => {
  render(b('box', 'Hello'), screen)
}, 200)

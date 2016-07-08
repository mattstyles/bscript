
const tape = require('tape')
const diff = require('./')
const b = require('../tree')

var x = b('box', [
  b('text', 'hello')
])
var y = b('box', [
  b('text', 'world')
])

console.log(x)
console.log(JSON.stringify(x))
console.log(diff(x, y))

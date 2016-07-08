
const patch = require('fast-json-patch')
// const b = require('../tree')
//
// var prev = b('box', 'A')
// var curr = b('box', 'B')
//
// let p = patch.compare(prev, curr)
// let res = patch.apply(prev, p)
//
// console.log('-->', prev)
// console.log(p)
// console.log(res)
// console.log('<--', prev)

module.exports = function (prev, next) {
  return patch.compare(prev, next)
}

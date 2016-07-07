
const tape = require('tape')
const b = require('./')
const {walk, walk2} = require('./util')

function count (node) {
  let count = 0
  walk(() => count++, node)
  return count
}

function invoke (fn) {
  let args = Array.from(arguments)
  return () => {
    fn(...args.slice(1, args.length - 1))
  }
}

const Component = props => {
  return b('box', props)
}

tape('b should create a single node', t => {
  t.ok(b('element').type === 'Element', 'b should capitalize types')
  t.end()
})

tape('Check type parameter type', t => {
  t.ok(typeof b(Component).type === 'function', 'b should accept a function as type')
  t.ok(typeof b('element').type === 'string', 'b should accept a string as type')
  t.end()
})

tape('b should throw when no type if supplied or can not be infered', t => {
  t.throws(invoke(b, {}), 'b should throw when the type is unspecified')
  t.throws(invoke(b, 1), 'b should throw when the type can not be infered')
  t.end()
})

tape('b should not require the use of an attribute object', t => {
  let root = b('element', [
    b('element')
  ])
  t.looseEquals(root.attr, {}, 'b generates an empty attribute object when not supplied')
  t.equal(root.children.length, 1, 'b processes child array as 2nd param')
  t.end()
})

tape('b should create a tree of nodes', t => {
  let tree = b('element', [
    b('element')
  ])
  t.equal(count(tree), 2, 'b should recursively create the tree')

  let deepTree = b('1', [
    b('2', [
      b('3')
    ])
  ])
  t.equal(count(deepTree), 3, 'b can create deep trees')

  t.end()
})

tape('b should append a content string into the attribute list', t => {
  t.equal(b('el', 'content').attr.content, 'content', 'content gets appended')
  t.end()
})

tape('walk will depth-first walk the tree', t => {
  let str = ''
  let tree = b('r', [
    b('1', [
      b('2'),
      b('3')
    ]),
    b('4', [
      b('5')
    ])])
  function relations (node) {
    str += node.type + (node.children.length ? '>' : '')
  }
  walk(relations, tree)
  t.equal(str, 'R>1>234>5', 'walk is pre-order')
  t.end()
})

tape('walk2 will depth-first walk the tree and remember parent nodes', t => {
  let str = ''
  let tree = b('r', [
    b('1', [
      b('2'),
      b('3')
    ]),
    b('4', [
      b('5')
    ])])
  function relations (node, parent) {
    str += '{' +
      parent.type +
      '>' +
      node.type +
      (node.children.length ? '' : '.') +
      '}'
  }
  walk2(relations, tree, {type: '$'})
  t.equal(str, '{$>R}{R>1}{1>2.}{1>3.}{R>4}{4>5.}', 'walk2 is pre-order')
  t.end()
})

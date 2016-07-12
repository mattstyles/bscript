
const tape = require('tape')
const b = require('bscript-tree')
const diffs = require('./diffs')
const util = require('../src/util')

tape('generatePath converts member path into node path', t => {
  let p = util.generatePath(diffs.root().path)
  let p2 = util.generatePath(diffs.deep2().path)
  let p3 = util.generatePath(diffs.deep3().path)

  t.equal(p, '_', 'Root is denoted by an underscore')
  t.equal(p2, '/children/0', 'Handles one deep structure')
  t.equal(p3, '/children/0/children/1', 'Handles multi depth structure')

  t.end()
})

tape('extPath should grab just the member path', t => {
  let p = util.extPath(diffs.root().path)
  let p2 = util.extPath(diffs.deep2().path)
  let p3 = util.extPath(diffs.deep3().path)

  t.equal(p, 'content', 'Root is denoted by an underscore')
  t.equal(p2, 'content', 'Handles one deep structure')
  t.equal(p3, 'content', 'Handles multi depth structure')

  t.end()
})

tape('getNode should be able to walk a tree and pick out a specific node', t => {
  let tree = b('box', [
    b('text', 'hello', [
      b('span', 'world'),
      b('element')
    ])
  ])

  let n = util.getNode('_', tree)
  let n2 = util.getNode('children/0', tree)
  let n3 = util.getNode('children/0/children/1', tree)

  t.equal(n.type, 'Box', 'Retrieves the root node using an underscore')
  t.equal(n2.type, 'Text', 'Retrieves child nodes')
  t.equal(n3.type, 'Element', 'Retrieves deeper nodes')

  t.equal(n2.attr.content, 'hello', 'Setup for reference test')
  tree.children[0].attr.content = 'test'
  t.equal(n2.attr.content, 'test', 'Nodes are grabbed by reference')

  t.end()
})

tape('parentPath should grab the path to the parent', t => {
  let p = util.parentPath('children/0')
  let p2 = util.parentPath('children/0/children/1')

  t.equal(p, '', 'Handles root parent')
  t.equal(p2, 'children/0', 'Handles deeper nodes')

  t.end()
})

tape('getParentNode should grab the parent of a specified node', t => {
  let tree = b('box', 'root', [
    b('text', 'hello', [
      b('span', 'world'),
      b('element')
    ])
  ])

  let p = util.getParentNode('_', tree)
  let p2 = util.getParentNode('children/0', tree)
  let p3 = util.getParentNode('children/0/children/1', tree)

  t.equal(p, null, 'Retrieves the root node using an underscore')
  t.equal(p2.type, 'Box', 'Retrieves child nodes')
  t.equal(p3.type, 'Text', 'Retrieves deeper nodes')

  t.equal(p2.attr.content, 'root', 'Setup for reference test')
  tree.attr.content = 'test'
  t.equal(p2.attr.content, 'test', 'Parent nodes are grabbed by reference')

  t.end()
})

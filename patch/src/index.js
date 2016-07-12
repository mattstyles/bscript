
const {handleReplace} = require('./replace')
const {createAdditionRecord, handleAdditions} = require('./add')
const R = require('./regex')

/**
 *
 */
module.exports = function reconcile (diff, root, screen) {
  let additions = new Map()

  screen.debug(diff)

  // @TODO forEach perf, consider while
  diff.forEach(d => {
    if (R.IGNORE.test(d.path)) {
      return
    }

    if (d.op === 'add') {
      additions.set(...createAdditionRecord(additions, d))
      return
    }

    if (d.op === 'replace') {
      // @TODO would it be better to handle replaces similarly to
      // additions by grouping all changes? Then just stamp over
      // all attr changes
      let m = handleReplace(root, d)
      // screen.debug(m, ':', diff)
      return
    }
  })

  additions.forEach(handleAdditions(root, screen))
}
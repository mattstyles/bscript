
const blessed = require('blessed')

const screen = blessed.screen({
  title: 'example',
  debug: true,
  log: './debug.log'
})

screen.on('keypress', (ch, key) => {
  if (['escape', 'q', 'C-c'].includes(key.full)) {
    process.exit(0)
  }
})

module.exports = screen

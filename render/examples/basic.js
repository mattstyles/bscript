
const render = require('../')
const b = require('../../tree')
const screen = require('./screen')

let App = props => {
  return b('box', {
    top: 0,
    left: 0,
    width: '100%',
    height: 3,
    border: {
      type: 'line'
    },
    style: {
      border: {
        fg: 'white'
      }
    }
  }, props.content)
}

render(App({
  content: 'Hello'
}), screen)

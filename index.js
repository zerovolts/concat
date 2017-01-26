const Interpreter = require('./src')

const tests = [
  '2 3 + 5 *', // basic operations
  '[+ *] ', // anonymous functions
  '(def a [+ 5 *])'
]

const transforms = [
  '2 3 +',
  [{type: 'integer', value: 2}, {type: 'integer', value: 3}, {type: 'function', fn: 7}]
]

//let source = '5 3 + 7 8 * print drop print'
let interp = new Interpreter({showStack: true, showTypes: false})
interp.repl()

const Interpreter = require('./src')
const Primitive = require('./src/primitive')

const fns = [
  'rand 100 * floor', // random integer from 0 to 99
  'dup len rand * floor get' // list -> random element from list
]

let interp = new Interpreter({showStack: true, showTypes: false})
interp.repl()

const Interpreter = require('./src')
const Primitive = require('./src/primitive')

const fns = [
  'rand 100 * floor', // random integer from 0 to 99
  'dup len rand * floor get' // list -> random element from list
]

let interpreter = new Interpreter({showStack: true, showTypes: false})

// ------ //

switch (process.argv.length) {
  case 2:
    interpreter.repl()
    break
  case 3:
    interpreter.file(process.argv[2])
    break
}

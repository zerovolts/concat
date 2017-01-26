const Parser = require('./parser')
const PrimitiveType = require('./primitive-type')
const Stack = require('./stack')

class Interpreter {
  constructor(options = {}) {
    this.parser = new Parser()
    this.source = ''
    this.options = options
    this.program = this.parser.parse(this.source)
    this.programCounter = 0
    this.stack = new Stack()
  }

  setProgram(source) {
    this.source = source
    this.programCounter = 0
    this.program = this.parser.parse(this.source)
  }

  next() {
    if (this.programCounter < this.program.length) {
      //console.log(this.program[this.programCounter])
      return this.read(this.program[this.programCounter++])
    } else {
      return false
    }
  }

  run() {
    while(this.next()) {}
    return this.stack.items
  }

  read(token) {
    if (token.type == PrimitiveType.Function) {
      //let args = this.stack.pop(token.arity)
      token.fn(this.stack)
      return this.stack.length
    } else {
      this.stack.push(token)
      return this.stack.length
    }
  }

  repl() {
    const stdin = process.openStdin()
    process.stdout.write('> ')
    stdin.addListener('data', d => {
      this.setProgram(d.toString().trim())
      let result = this.run()
      if (this.options.showStack) {
        if (this.options.showTypes) {
          console.log('::', '[' + result.map(e => e.string + '~' + e.type).join(' ') + ']')
        } else {
          console.log('::', '[' + result.map(e => e.string).join(' ') + ']')
        }
      }
      process.stdout.write('> ')
    })
  }
}

module.exports = Interpreter

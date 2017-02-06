const Parser = require('./parser')
const PrimitiveType = require('./primitive-type')
const Stack = require('./stack')
const library = require('./library')
const fs = require('fs')

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

  run() {
    while(this.next()) {}
    return this.stack.items
  }

  next() {
    if (this.programCounter < this.program.length) {
      //console.log(this.program[this.programCounter])
      return this.read(this.program[this.programCounter++])
    } else {
      return false
    }
  }

  read(token) {
    if (token.type == PrimitiveType.Identifier) {
      token = library.get(token.value)
    }

    if (token.type == PrimitiveType.Function) {
      token.fn(this.stack)
      return this.stack.length
    } else {
      this.stack.push(token)
      return this.stack.length
    }
  }

  file(filename) {
    fs.readFile(filename, 'utf-8', (err, data) => {
      if (err) throw err;
      this.setProgram(data.toString().trim())
      this.run()
      //console.log(':', evalStr(data))
    });
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

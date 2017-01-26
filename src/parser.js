const Primitive = require('./primitive')
const library = require('./library')

class Parser {
  constructor() {
    // unable to have spaces in strings with this
    this.splitter = /\s|(\[|\])/
    this.tokenMatchers = [{
        type: 'identifier',
        regex: /^[A-Za-z\-\+\!\?\*\>\<][\w\-\+\!\?\*\>\<]*$/,
        // should return a Symbol/Identifier object, and look up at runtime, perhaps?
        fn: result => library.get(result[0])
      }, {
        type: 'integer',
        regex: /^\d+$/,
        fn: result => Primitive.Integer(Number(result[0]))
      }, {
        type: 'real',
        regex: /^\d+\.\d+$/,
        fn: result => Primitive.Real(Number(result[0]))
      }, {
        type: 'ratio',
        regex: /^\d+\/d+$/,
        fn: result => {
          let [a, b] = result[0].split('/').map(Number(result[0]))
          return Primitive.Ratio(a, b)
        }
      }, {
        type: 'string',
        regex: /^"(.*)"$/,
        fn: result => Primitive.String(String(result[1]))
      }
    ]
  }

  lex(str) {
    return str.split(this.splitter).filter(Boolean)
  }

  tokenize(lexemes) {
    return lexemes.map(lexeme => {
      for (let i = 0, n = this.tokenMatchers.length; i < n; i++) {
        let matcher = this.tokenMatchers[i]
        let result = lexeme.match(matcher.regex)

        if (result) {
          return matcher.fn(result)
        }
      }
      throw new Error('Lexeme [' + lexeme + '] could not be parsed')
    })
  }

  parse(str) {
    return this.tokenize(this.lex(str))
  }
}

module.exports = Parser

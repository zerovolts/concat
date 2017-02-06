const Primitive = require('./primitive')
const PrimitiveType = require('./primitive-type')
const library = require('./library')

class Parser {
  constructor() {
    // unable to have spaces in strings with this
    this.splitter = /\s|([\[\]\{\}\.])/
    this.tokenMatchers = [{
        type: 'identifier',
        regex: /^[A-Za-z\-\+\!\?\*\>\<][\w\-\+\!\?\*\>\<]*$/,
        fn: result => Primitive.Identifier(String(result[0]))
      }, {
        type: 'symbol',
        regex: /^\:([A-Za-z\-\+\!\?\*\>\<][\w\-\+\!\?\*\>\<]*)$/,
        fn: result => Primitive.Symbol(String(result[1]))
      },{
        type: 'label',
        regex: /^([A-Za-z\-\+\!\?\*\>\<][\w\-\+\!\?\*\>\<]*)\:$/,
        fn: result => Primitive.Label(String(result[1]))
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
        regex: /^\d+\/\d+$/,
        fn: result => {
          let [a, b] = result[0].split('/').map(x => Number(x))
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
      if (lexeme == '[') {return {type: 'left-bracket', value: '['}}
      if (lexeme == ']') {return {type: 'right-bracket', value: ']'}}
      if (lexeme == '{') {return {type: 'left-brace', value: '{'}}
      if (lexeme == '}') {return {type: 'right-brace', value: '}'}}

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

  parseStructures(tokens, type) {
    const nodes = []

    while (tokens.length > 0) {
      const token = tokens.shift()

      switch (token.type) {
        case 'left-bracket':
          nodes.push(this.parseStructures(tokens, PrimitiveType.List))
          break
        case 'left-brace':
          nodes.push(this.parseStructures(tokens, PrimitiveType.Object))
          break
        case 'right-bracket':
          if (type == PrimitiveType.List) {
            return Primitive.List(nodes)
          } else {
            throw Error('Mismatched brackets')
          }
        case 'right-brace':
          if (type == PrimitiveType.Object) {
            return new Primitive.Object(nodes)
          } else {
            throw Error('Mismatched braces')
          }
        default:
          nodes.push(token)
          break
      }
    }
    return nodes
  }

  parse(str) {
    return this.parseStructures(this.tokenize(this.lex(str)))
  }
}

module.exports = Parser

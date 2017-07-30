const PrimitiveType = Object.freeze({
  Function: 'function',
  Integer: 'integer',       // 34
  Real: 'real',             // 3.14
  Ratio: 'ratio',           // 3/7
  String: 'string',         // "abc"
  Identifier: 'identifier', // abc
  Symbol: 'symbol',         // :abc
  Label: 'label',           // abc:
  List: 'list',             // [1 2 3]
  Object: 'object',         // {a: 4 b: 7}
  Semicolon: 'semicolon'
})

module.exports = PrimitiveType

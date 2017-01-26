const PrimitiveType = require('./primitive-type')

const Primitive = {}

Primitive.Integer = function(n) {
  if (Number.isInteger(n)) {
    return {
      type: PrimitiveType.Integer,
      value: n,
      string: n.toString()
    }
  } else {
    throw new Error(n + ' is not an integer')
  }
}

Primitive.Real = function(n) {
  return {
    type: PrimitiveType.Real,
    value: n,
    string: n.toString()
  }
}

Primitive.Ratio = function(a, b) {
  if (Number.isInteger(a) && Number.isInteger(b)) {
    console.log('Primitive!', a, b)
    return {
      type: PrimitiveType.Ratio,
      value: [a, b],
      string: a + '/' + b
    }
  } else {
    throw new Error(n + ' is not an integer')
  }
}

Primitive.String = function(n) {
  return {
    type: PrimitiveType.String,
    value: n,
    string: '"' + n + '"'
  }
}

Primitive.Function = function(fn, name = '?') {
  if (fn instanceof Function) {
    return {
      type: PrimitiveType.Function,
      name: name,
      //arity: arity,
      fn: fn,
      string: '[function ' + name + ']'
    }
  } else {
    throw new Error(fn + ' is not a function')
  }
}

module.exports = Primitive

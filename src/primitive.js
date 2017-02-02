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

Primitive.String = function(s) {
  return {
    type: PrimitiveType.String,
    value: s,
    string: '"' + s + '"'
  }
}

Primitive.Symbol = function(s) {
  return {
    type: PrimitiveType.Symbol,
    value: s,
    string: s.toString()
  }
}

Primitive.Function = function(fn, name = '?') {
  if (fn instanceof Function) {
    return {
      type: PrimitiveType.Function,
      name: name,
      //arity: arity,
      fn: fn,
      string: '[fn ' + name + ']'
    }
  } else {
    throw new Error(fn + ' is not a function')
  }
}

Primitive.List = function(l) {
  return {
    type: PrimitiveType.List,
    value: l,
    string: '[' + l.map(elem => elem.string).join(' ') + ']'
  }
}

/*
Primitive.Object = function(o) {
  return {
    type: Primitive.Object,
    value: o,
    string: '{' + Object.keys(o).map(key => key.string + ': ' + o[key].string).join(' ') + '}'
  }
}
*/

Primitive.Object = class {
  constructor(init = {}) {
    this.type = PrimitiveType.Object
    this.value = {}
    if (Array.isArray(init)) {
      this.populateFromArray(init)
    } else {
      this.populateFromObject(init)
    }
  }

  populateFromArray(arr) {
    if (arr.length % 2 != 0) {
      throw Error('Not an even number of key/value pairs')
    }
    for (let i = 0, len = arr.length; i < len; i += 2) {
      this.set(arr[i], arr[i + 1])
    }
  }

  populateFromObject(obj) {
    Object.keys(obj).map(key => this.set(key, obj[key]))
  }

  set(symbol, value) {
    /* for arbitrary object key types
    if (symbol.type == undefined) {
      this.value[symbol] = value
    } else {
      this.value[symbol.type + '_' + symbol.string] = value
    }
    */
    if (symbol.type == PrimitiveType.Symbol) {
      this.value[symbol.string] = value
    } else {
      this.value[symbol] = value
    }

  }

  get(symbol) {
    //return this.value[symbol.type + '_' + symbol.string]
    if (symbol.type == PrimitiveType.Object) {
      let result = this.value[symbol.string]
      if (result == undefined) {
        throw new SymbolNotFoundError(symbol.string)
      }
      return result
    }
  }

  get string() {
    return '{' + Object.keys(this.value).map(key => key + ': ' + this.value[key].string).join(' ') + '}'
  }
}

module.exports = Primitive

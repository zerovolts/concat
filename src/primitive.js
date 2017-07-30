const PrimitiveType = require('./primitive-type')

const Primitive = {}

// *** Integer *** //
Primitive.Integer = class int {
  constructor(n) {
    if (Number.isInteger(n)) {
      this.value = n
    } else {
      throw new Error(n + ' is not an integer')
    }
  }

  get type() {
    return PrimitiveType.Integer
  }

  toString() {
    return this.value.toString()
  }
}

// *** Real *** //
Primitive.Real = class real {
  constructor(n) {
    // TODO: check type
    this.value = n
  }

  get type() {
    return PrimitiveType.Real
  }

  toString() {
    // add '.0' to the end of whole numbers
    let str = this.value.toString()
    return str.includes('.') ? str : str + '.0'
  }
}

// *** Ratio *** //
Primitive.Ratio = class ratio {
  constructor(num, den) {
    if (Number.isInteger(num) && Number.isInteger(den)) {
      this.numerator = num
      this.denominator = den
    } else {
      // separate errors for each?
      throw new Error(num + 'or' + den + ' is not an integer')
    }
  }

  get type() {
    return PrimitiveType.Ratio
  }

  get value() {
    return this.numerator / this.denominator
  }

  toString() {
    return this.numerator + '/' + this.denominator
  }
}

// *** String *** //
Primitive.String = class string {
  constructor(str) {
    if (typeof str === 'string' || str instanceof String) {
      this.value = str
    } else {
      throw new Error(str + ' is not a string')
    }
  }

  get type() {
    return PrimitiveType.String
  }

  toString() {
    return '"' + this.value + '"'
  }
}

// *** Identifier *** //
Primitive.Identifier = class ident {
  // ex. hello
  constructor(sym) {
    if (typeof sym === 'string' || sym instanceof String) {
      this.value = sym
    } else {
      throw new Error(sym + ' is not a valid identifier')
    }
  }

  get type() {
    return PrimitiveType.Identifier
  }

  toString() {
    return this.value.toString()
  }
}

// *** Symbol *** //
Primitive.Symbol = class symbol {
  // ex. :hello
  constructor(sym) {
    if (typeof sym === 'string' || sym instanceof String) {
      this.value = sym
    } else {
      throw new Error(sym + ' is not a valid identifier')
    }
  }

  get type() {
    return PrimitiveType.Symbol
  }

  toString() {
    return this.value.toString()
  }
}

// *** Label *** //
Primitive.Label = class label {
  // ex. hello:
  constructor(sym) {
    if (typeof sym === 'string' || sym instanceof String) {
      this.value = sym
    } else {
      throw new Error(sym + ' is not a valid identifier')
    }
  }

  get type() {
    return PrimitiveType.Label
  }

  toString() {
    return this.value.toString()
  }
}

// *** Function *** //
Primitive.Function = class func {
  // are names necessary is all functions are lambdas?
  constructor(fn, name = '?') {
    if (fn instanceof Function) {
      this.name = name
      this.fn = fn
    } else {
      throw new Error(fn + ' is not a function')
    }
  }

  get type() {
    return PrimitiveType.Function
  }

  toString() {
    return '[fn ' + this.name + ']'
  }
}

// *** List *** //
Primitive.List = class list {
  constructor(l) {
    if (Array.isArray(l)) {
      this.value = l
    } else {
      throw new Error(l + ' is not a list')
    }
  }

  get type() {
    return PrimitiveType.List
  }

  toString() {
    return '[' + this.value.map(elem => elem.toString()).join(', ') + ']'
  }
}

// *** Object *** //
Primitive.Object = class object {
  constructor(flatArray = []) {
    this.value = new Map(this._stackArray(flatArray))
  }

  // [1, 2, 3, 4] -> [[1, 2], [3, 4]]
  _stackArray(flatArray) {
    if (flatArray.length % 2 != 0) {
      throw Error('Not an even number of key/value pairs')
    }
    //flatArray = flatArray.map(elem => elem.value)

    let newArray = []
    for (let i = 0; i < flatArray.length - 1; i += 2) {
      newArray.push(flatArray.slice(i, i + 2))
    }

    // strip the keys of their object wrappers
    newArray.map(pair => [pair[0].value, pair[1]])

    return newArray
  }

  get(key) {
    return this.value.get(key.value)
  }

  set(key, value) {
    this.value.set(key.value, value)
  }

  get type() {
    return PrimitiveType.Object
  }

  toString() {
    // TODO: better implementation?
    let array = []
    this.value.forEach((value, key) => {
      console.log(value.toString())
      array.push([key.toString(), value.toString()])
    })
    return '{' + array.map(entry => entry[0] + ': ' + entry[1]).join(', ') + '}'
    //return Array.from(this.value.entries())
  }
}

module.exports = Primitive

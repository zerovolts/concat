const Primitive = require('../primitive')
const PrimitiveType = require('../primitive-type')
const SymbolTable = require('../symbol-table')

const builtins = new SymbolTable()

function realInt(...numbers) {
  if (numbers.every(number => number.type == PrimitiveType.Integer)) {
    return Primitive.Integer
  } else {
    return Primitive.Real
  }
}

builtins.set('+', new Primitive.Function(stack => {
  let [a, b] = stack.pop(2)
  stack.push(new (realInt(a, b))(a.value + b.value))
}))

builtins.set('-', new Primitive.Function(stack => {
  let [a, b] = stack.pop(2)
  stack.push(new (realInt(a, b))(a.value - b.value))
}))

builtins.set('/', new Primitive.Function(stack => {
  let [a, b] = stack.pop(2)
  stack.push(new (realInt(a, b))(a.value / b.value))
}))

builtins.set('*', new Primitive.Function(stack => {
  let [a, b] = stack.pop(2)
  stack.push(new (realInt(a, b))(a.value * b.value))
}))

builtins.set('mod', new Primitive.Function(stack => {
  let [a, b] = stack.pop(2)
  stack.push(Primitive.Integer(a.value % b.value))
}))

builtins.set('**', new Primitive.Function(stack => {
  let [a, b] = stack.pop(2)
  stack.push(new (realInt(a, b))(Math.pow(a.value, b.value)))
}))

builtins.set('floor', new Primitive.Function(stack => {
  let a = stack.pop()
  stack.push(new Primitive.Integer(Math.floor(a.value)))
}))

builtins.set('rand', new Primitive.Function(stack => {
  stack.push(new Primitive.Real(Math.random()))
}))

builtins.set('print', new Primitive.Function(stack => {
  let val = stack.pop()
  console.log(val.value)
  stack.push(val)
}))

// String //

builtins.set('to-upper', new Primitive.Function(stack => {
  let a = stack.pop()
  stack.push(new Primitive.String(a.value.toUpperCase()))
}))

builtins.set('reverse', new Primitive.Function(stack => {
  let a = stack.pop()
  stack.push(new Primitive.String(a.value.split('').reverse().join('')))
}))

builtins.set('str-get', new Primitive.Function(stack => {
  let [str, index] = stack.pop(2)
  stack.push(new Primitive.String(str.value[index.value]))
}))

// List/Quoted Program //

builtins.set('get', new Primitive.Function(stack => {
  let [list, index] = stack.pop(2)
  stack.push(list.value[index.value])
}))

builtins.set('push', new Primitive.Function(stack => {
  let [list, val] = stack.pop(2)
  list.value.push(val)
  stack.push(new Primitive.List(list.value))
}))

builtins.set('len', new Primitive.Function(stack => {
  let list = stack.pop()
  stack.push(new Primitive.Integer(list.value.length))
}))

// Object //

// {a: 5} :a get-key
// > 5
builtins.set('get-key', new Primitive.Function(stack => {
  let [obj, key] = stack.pop(2)
  stack.push(obj.get(key))
}))

// {} :a 5 set-key
// > {a: 5}
builtins.set('set-key', new Primitive.Function(stack => {
  let [obj, key, value] = stack.pop(3)
  obj.set(key, value)
  stack.push(obj)
}))

// ------

builtins.set('drop', new Primitive.Function(stack => {
  stack.pop()
}))

builtins.set('swap', new Primitive.Function(stack => {
  let [a, b] = stack.pop(2)
  stack.push(b, a)
}))

builtins.set('rot', new Primitive.Function(stack => {
  let [a, b, c] = stack.pop(3)
  stack.push(b, c, a)
}))

builtins.set('dup', new Primitive.Function(stack => {
  let a = stack.pop()
  stack.push(a, a)
}))

//
builtins.set('defint', new Primitive.Function(stack => {
  let [value, name] = stack.pop(2)
  builtins.set(name, new Primitive.Integer(value))
}))

module.exports = builtins

/*
const Builtins = {
  '+': Primitive.Function(stack => stack.push(Primitive.Integer(stack.pop().value + stack.pop().value))),
  '-': Primitive.Function(stack => stack.push(Primitive.Integer(stack.pop().value - stack.pop().value))),
  '/': Primitive.Function(stack => stack.push(Primitive.Integer(stack.pop().value / stack.pop().value))),
  '*': Primitive.Function(stack => stack.push(Primitive.Integer(stack.pop().value * stack.pop().value))),
  'drop': Primitive.Function(stack => stack.pop()),
  'print': Primitive.Function(stack => {let val = stack.pop(); console.log(val.value); stack.push(val)})
}
*/

const Primitive = require('../primitive')
const PrimitiveType = require('../primitive-type')
const SymbolTable = require('../symbol-table')

const builtins = new SymbolTable()

/* template
builtins.set(name, Primitive.Function(stack => {
}))
*/

function realInt(...numbers) {
  if (numbers.every(number => number.type == PrimitiveType.Integer)) {
    return Primitive.Integer
  } else {
    return Primitive.Real
  }
}

builtins.set('+', Primitive.Function(stack => {
  let [a, b] = stack.pop(2)
  stack.push(realInt(a, b)(a.value + b.value))
}))

builtins.set('-', Primitive.Function(stack => {
  let [a, b] = stack.pop(2)
  stack.push(realInt(a, b)(a.value - b.value))
}))

builtins.set('/', Primitive.Function(stack => {
  let [a, b] = stack.pop(2)
  stack.push(realInt(a, b)(a.value / b.value))
}))

builtins.set('*', Primitive.Function(stack => {
  let [a, b] = stack.pop(2)
  stack.push(realInt(a, b)(a.value * b.value))
}))

builtins.set('mod', Primitive.Function(stack => {
  let [a, b] = stack.pop(2)
  stack.push(Primitive.Integer(a.value % b.value))
}))

builtins.set('**', Primitive.Function(stack => {
  let [a, b] = stack.pop(2)
  stack.push(realInt(a, b)(Math.pow(a.value, b.value)))
}))

builtins.set('floor', Primitive.Function(stack => {
  let a = stack.pop()
  stack.push(Primitive.Integer(Math.floor(a.value)))
}))

builtins.set('rand', Primitive.Function(stack => {
  stack.push(Primitive.Real(Math.random()))
}))

builtins.set('print', Primitive.Function(stack => {
  let val = stack.pop()
  console.log(val.value)
  stack.push(val)
}))

// String //

builtins.set('toUpper', Primitive.Function(stack => {
  let a = stack.pop()
  stack.push(Primitive.String(a.value.toUpperCase()))
}))

builtins.set('strGet', Primitive.Function(stack => {
  let [str, index] = stack.pop(2)
  stack.push(Primitive.String(str.value[index.value]))
}))

// ------

builtins.set('drop', Primitive.Function(stack => {
  stack.pop()
}))

builtins.set('swap', Primitive.Function(stack => {
  let [a, b] = stack.pop(2)
  stack.push(b, a)
}))

builtins.set('rot', Primitive.Function(stack => {
  let [a, b, c] = stack.pop(3)
  stack.push(b, c, a)
}))

builtins.set('dup', Primitive.Function(stack => {
  let a = stack.pop()
  stack.push(a, a)
}))

//
builtins.set('defint', Primitive.Function(stack => {
  let [value, name] = stack.pop(2)
  builtins.set(name, Primitive.Integer(value))
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

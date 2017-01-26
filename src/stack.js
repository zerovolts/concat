class Stack {
  constructor(items = []) {
    this.items = items
  }

  push(...items) {
    this.items.push(...items)
    return this.length
  }

  pop(count = 1) {
    if (count == 1) {
      return this.items.pop()
    }
    return this.items.splice(this.length - count, count)
  }

  clear() {
    this.items = []
    return this.length
  }

  get length() {
    return this.items.length
  }

  get values() {
    return this.items.map(item => item.string)
  }

  print() {
    return '[' + this.values.join(' ') + ']'
  }
}

module.exports = Stack

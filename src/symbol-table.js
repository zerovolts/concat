const SymbolNotFoundError = require('./errors').SymbolNotFoundError

class SymbolTable {
  constructor() {
    this.table = {}
  }

  set(symbol, value) {
    this.table[symbol] = value
  }

  get(symbol) {
    let result = this.table[symbol]
    if (result == undefined) {
      throw new SymbolNotFoundError(symbol)
    }
    return result
  }
}

module.exports = SymbolTable

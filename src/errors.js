class SymbolNotFoundError extends Error {
  constructor(symbol) {
    super()
    this.message = 'symbol [' + symbol + '] not found'
    this.name = 'SymbolNotFoundError'
  }
}

module.exports.SymbolNotFoundError = SymbolNotFoundError

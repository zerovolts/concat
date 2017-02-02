This is an interpreter for a stack-based [concatenative](https://en.wikipedia.org/wiki/Concatenative_programming_language) programming language.  
Values are pushed onto a stack and functions are postfix, taking their arguments from the stack.  


A few examples:
```
// multiply two numbers (then add it to the stack)
> 3 5 *
:: [15]

// generate an integer between 0 and 100 (then add it to the stack)
> rand 100 * floor
:: [15 67]

// swap the position of the two numbers and subtract
> swap -
:: [52]
```

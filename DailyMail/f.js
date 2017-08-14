/**
 * ## Task
 * The purpose of this test was to create a function that would operate as so:
 * 
 * ```
 * f()()("l") // => "ool"
 * f()()()()("a") // => "ooooa"
 * ```
 * 
 * ## Implementation
 * * Create a closure with a variable that maintains state
 * * Every time the return function is executed add an "o" to the state
 * * If an argument is supplied, return the current state with the argument added at the end
 * * If no argument is supplied, return the return function
 * @param {String} input 
 */
function f (input) {
  var state = ''

  function q (input) {
    // Add "o" for every call
    state += 'o'

    /**
     * If an input is supplied, return the 
     * current state plus input
     */
    if (input) {
      // Add input to current state
      state += input
      return state
    }

    /**
     * If no input return q
     */
    else return q
  }

  return q
}

console.log(f()()()()()()('b'))

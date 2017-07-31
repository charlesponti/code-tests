var count = 0;

/**
 * @param {Number} n
 */
function fib(n) {
  count++

  if (n < 0) {
    return 0;
  } else if (n === 1) {
    return 1;
  } else {
    return fib(n - 1) + fib(n - 2)
  }
}

var countWithMemo = 0;
var memo = {};

/**
 * @param {Number} n
 * @param {Number[]} memo
 */
function fibWithMemo(n, memo) {
  countWithMemo++

  if (n < 0) {
    return 0;
  } else if (n === 1) {
    return 1;
  } 

  // If already in memo (already calculated), return value
  else if (memo[n]) {  
    return memo[n];
  } 
  
  else {
    // Get value
    var val = fibWithMemo(n - 1, memo) + fibWithMemo(n - 2, memo);
    
    // Assign to memo
    memo[n] = val
    
    // Return value
    return val;
  }
}

console.log(fib(10), count + " times")
console.log(fibWithMemo(10, memo), countWithMemo + " times called")

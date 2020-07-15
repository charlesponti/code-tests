let count = 0;

/**
 * @param {Number} n
 */
function fib(n) {
  count += 1;

  if (n < 0) {
    return 0;
  } if (n === 1) {
    return 1;
  }
  return fib(n - 1) + fib(n - 2);
}

let countWithMemo = 0;
const memo = {};

/**
 * @param {Number} n
 * @param {Number[]} memo
 */
function fibWithMemo(n, memo) {
  countWithMemo += 1;

  if (n < 0) return 0;

  if (n === 1) return 1;

  // If already in memo (already calculated), return value
  if (memo[n] === undefined) {
    // Assign to memo
    memo[n] = fibWithMemo(n - 1, memo) + fibWithMemo(n - 2, memo);
  }

  return memo[n];
}

console.log(fib(10), `${count} times`);
console.log(fibWithMemo(10, memo), `${countWithMemo} times called`);

// -----------------
// Space Complexity (aka) memory usage
// -----------------
// There are only O(N) things that can be on call stack
// at any one time
function validSquare(g, r, c) {

}

function isAtEnd(g, r, c) {

}

let countPathsCount = 0;
function countPaths(grid, row, col) {
  countPathsCount++;

  if (!validSquare(grid, row, col)) return 0;

  if (!isAtEnd(grid, row, col)) return 1;

  return (
    countPaths(grid, row + 1, col)
    + countPaths(grid, row, col + 1)
  );
}

let countPathsCountWithMemo = 0;
const paths = {};
function countPaths(grid, row, col, paths) {
  countPathsCountWithMemo++;

  if (!validSquare(grid, row, col)) return 0;

  if (!isAtEnd(grid, row, col)) return 1;

  if (paths[row][col] === 0) {
    paths[row][col] = (
      countPaths(grid, row + 1, col)
      + countPaths(grid, row, col + 1)
    );
  }

  return paths[row][col];
}

console.log(fib(10), `${count} times`);
console.log(fibWithMemo(10, memo), `${countWithMemo} times called`);

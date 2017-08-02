var primes = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97];

// Total number of possible choices
var numbers = 100

// current minimum guess
var min = 1

// Current maximum guess
var max = void 0;

// 100 - 1 = 99
function getGuess(max, min) {
  // We want to get floor the maximum 
  // value so that the guess does not 
  // exceed the maximum
  max = Math.floor(max)

  // We want to get the ceiling of the 
  // minimum value so that the guess 
  // does not drop below the minimum value
  min = Math.ceil(min)
  
  return Math.floor(
    Math.random() * (max - min) + min
  )
}

var correctAnswer = getGuess(numbers, min)

var count = 0
var found = false
while(true) {
  count++
  // For the first pass we will use
  // the numbers variable to get an 
  // initial guess. Afterwards, we will
  // use our ranges
  current = getGuess(max || numbers, min)
  
  // Go no further once correct answer is found
  if (current === correctAnswer) {
    break;
  }
  
  // Lets say the first guess is 75
  // and the correctAnswer is 73. We will
  // want to guess between 1 and 75  
  if (max > correctAnswer) {
    max = current
  }

  // Lets say the first guess is 73
  // and the correctAnswer is 75. We will
  // want to guess between 100 and 73
  if (max < correctAnswer) {
    min = current
  }
}

console.log(count)
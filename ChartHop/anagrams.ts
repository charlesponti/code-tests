// Given an array of strings, group anagrams together.

// Example:

// Input: ["eat", "tea", "tan", "ate", "nat", "bat"],
// Output:
// [

// ]
// Note:

// All inputs will be in lowercase.
// The order of your output does not matter.

const input = ["eat", "tea", "tane", "ate", "nat", "bat"]

const BreakException = {}

function checkAllLetters(arr, word) {
  const firstWord = arr[0]
  
  return (
    firstWord.length === word.length &&
    word
        .split('')
        .reduce((array, letter) => {
          array.push(firstWord.indexOf(letter) !== -1)
          return array
        }, [])
        .indexOf(false) === -1
  )
}

function getAnagramArrayIndex(results, word) {
  for (let i = 0; i < results.length; i++) {
    //   Check that each character is represented
    if (checkAllLetters(results[i], word)) {
      console.log(results[i], word, i)
      return i
    }
  }
}

function anagramer(initial) {
  const results =  [
    //   ["ate","eat","tea"],
    //   ["nat","tan"],
    //   ["bat"]
  ]
  
  initial.forEach((word) => {
   let index = getAnagramArrayIndex(results, word)
    
    if (index !== undefined) {
      results[index].push(word)
    } else {
      results.push([word])
    }
  })
  
  return results
}

console.log(anagramer(input))
// console.log(checkAllLetters(['eat'], 'tea'))
// console.log(checkAllLetters(['eat'], 'abaneat'))
// console.log(checkAnagramArray([['eat'], ['ban']], 'tea')) // 0
// console.log(checkAnagramArray([['eat'], ['ban'], ['zap']], 'nab')) // 1
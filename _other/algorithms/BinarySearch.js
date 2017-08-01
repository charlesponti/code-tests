const array = [1,2,3,4,5,6,7,8,9,10]

/**
 * Split an array in half
 * @param {Array} arr 
 * @returns {Array} The orignal array split in half
 */
function splitArrayInHalf(arr) {
  return array.reduce(function(a, b, i) {
    const length = array.length / 2
    if (i === 0 || i === length) a.push([b])
    else if (i < length) a[0].push(b)
    else if (i > length) a[1].push(b)
    return a
  }, [])
}

console.log(splitArrayInHalf(array))
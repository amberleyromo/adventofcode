const fs = require('fs');

(function solve() {
  const input = fs.readFileSync('input.txt', 'utf-8').split('\n')
    .map(function(arr) {
      return arr.split('\t').map(Number);
    })

  console.log({
    part1: minMax(input),
    part2: evenDiv(input)
  })
})()

function minMax(input) {
  return input
    .map(function(arr) {
      return arr.sort((a, b) => a - b);
    })
    .reduce(function(sum, curr, _, input) {
      return sum +=  curr[input.length - 1] - curr[0];
    }, 0);
}

function evenDiv(input) {
  return input
    .map(function(arr) {
      return arr.sort((a, b) => b - a);
    })
    .reduce(function (sum, curr) {
      for (let i = 0; i < curr.length - 1; i++) {
        for (let j = i + 1; j < curr.length; j++) {
          if (curr[i] % curr[j] === 0) {
            return sum += curr[i] / curr[j];
          } 
        }
      }
    }, 0);
}

const fs = require('fs');

(function solve() {
  const input = fs.readFileSync('input.txt', 'utf-8').split('\n')
    .map(function(arr) {
      return arr.split('\t').map(Number).sort((a, b) => b - a);
    });

  console.log({
    part1: minMax(input),
    part2: evenDiv(input)
  });
})()

function minMax(input) {
  return input
    .reduce((sum, row) => {
      return sum += Math.max(...row) - Math.min(...row);
    }, 0);
}

function evenDiv(input) {
  return input
    .reduce((sum, row) => {
      for (let i = 0; i < row.length - 1; i++) {
        for (let j = i + 1; j < row.length; j++) {
          if (row[i] % row[j] === 0) {
            return sum += row[i] / row[j];
          } 
        }
      }
    }, 0);
}

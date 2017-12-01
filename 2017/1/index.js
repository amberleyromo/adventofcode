var fs = require('fs');

(function solve() {
  console.log({
    part1: solveByNext(),
    part2: solveByHalfway()
  })
})();

function getPuzzle() {
  const sequence = fs.readFileSync('source.txt', 'utf-8').split('')
    .map(function(val) {
      return parseInt(val);
    });
    
  let len = sequence.length;
  return {
    sequence,
    len,
    lastIdx: len - 1,
    halfLength: len / 2,
  }
}

function solveByNext() {
  const input = getPuzzle();
  return input.sequence
    .reduce(function(sum, val, idx, seq) {
      let nextVal = seq[idx + 1];
      if (val === nextVal) {
        return sum += nextVal
      }
      
      if (idx === input.lastIdx) {
        let lastVal = seq[idx];
        return sum += lastVal === seq[0] ? lastVal : 0;
      }
      
      return sum;
    }, 0);
}

function solveByHalfway() {
  const input = getPuzzle();
  return input.sequence
    .reduce(function(sum, val, idx, seq) {
      let idxChange = idx + input.halfLength;
      let newIdx = idxChange <= input.lastIdx ? idxChange : idxChange - input.len;
      
      if (val === seq[newIdx]) {
        return sum += seq[newIdx]
      }
      
      return sum;

    }, 0);
}

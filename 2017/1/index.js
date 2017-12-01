var fs = require('fs');

(function solve() {
  const input = fs.readFileSync('source.txt', 'utf-8').split('')
    .map(Number);
    
  console.log({
    part1: solveByNext(input),
    part2: solveByHalfway(input)
  })
})();

function solveByNext(input) {
  return input
    .reduce(function(sum, curr, idx, seq) {
      let next = idx === seq.length-1 ? seq[0] : seq[idx + 1];
      return sum += curr === next ? next : 0;
    }, 0);
}

function solveByHalfway(input) {
  return input
    .reduce(function(sum, curr, idx, seq) {
      let halfVal = seq[(idx + seq.length/2) % seq.length];
      return sum += curr === halfVal ? halfVal : 0;
    }, 0);
}

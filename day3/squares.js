var fs = require('fs');

var possibleTriangles =
  fs.readFileSync('instructions.txt', 'utf-8').trim().split('\n')
    .map(function(triangle) {
      return triangle.trim().split('  ').map(function(side) {
        return +side;
      });
    });

function isTriangle(sides) {
  return (
    (sides[0] + sides[1] > sides[2])
    && (sides[1] + sides[2] > sides[0])
    && (sides[2] + sides[0] > sides[1])
  );
}

console.log(possibleTriangles.filter(isTriangle).length);

var fs = require('fs');

var possibleTriangles =
  fs.readFileSync('instructions.txt', 'utf-8').trim().split('\n')
    .map(function(triangle) {
      return triangle.trim().split(/\s+/).map(function(side) {
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

function remap(triangles) {
  var remap = [];
  for (var i = 0; i < triangles.length; i+=3) {
    remap.push([triangles[i][0], triangles[i+1][0], triangles[i+2][0]]);
    remap.push([triangles[i][1], triangles[i+1][1], triangles[i+2][1]]);
    remap.push([triangles[i][2], triangles[i+1][2], triangles[i+2][2]]);
  }
  return remap;
}

console.log(possibleTriangles.filter(isTriangle).length);
console.log(remap(possibleTriangles).filter(isTriangle).length);

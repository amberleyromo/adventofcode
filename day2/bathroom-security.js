var instructions = require('./instructions.js').split(', ');

var keypad =
[ [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9] ];

var updown = 1, leright = 1;

function move(step){
  switch (step) {
    case 'U':
      return updown > 0 ? updown-- : 0
      break;
    case 'D':
      return updown < 2 ? updown++ : 2
      break;
    case 'L':
      return leright > 0 ? leright-- : 0
      break;
    case 'R':
      return leright < 2 ? leright++ : 2
      break;
    default:
      break;
  }
}

function decode(procedure){
  return procedure.map(function(bundledSteps) {
    bundledSteps.split('').forEach(function(step){
      move(step);
    })
    return keypad[updown][leright];
  }).join('');
}

decode(instructions);

var instructions = require('./instructions.js').split(', ');

var keypadNormal =
[ [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9] ];

var keypadByCommittee =
[ [0, 0, 1, 0, 0],
  [0, 2, 3, 4, 0],
  [5, 6, 7, 8, 9],
  [0, 'A', 'B', 'C', 0],
  [0, 0, 'D', 0, 0] ];

var part1start = [1, 1],
    part2start = [2, 0];

function decode(procedure, keypad, pos){
  return procedure.map(function(bundledSteps) {
    bundledSteps.split('').forEach(function(step){
      switch (step) {
        case 'U':
          if (keypad[pos[0] - 1] && keypad[pos[0] - 1][pos[1]]) {
            pos[0]--;
          }
          break;
        case 'D':
          if (keypad[pos[0] + 1] && keypad[pos[0] + 1][pos[1]]) {
            pos[0]++;
          }
          break;
        case 'L':
          if (keypad[pos[0]][pos[1] - 1]) {
            pos[1]--;
          }
          break;
        case 'R':
          if (keypad[pos[0]][pos[1] + 1]) {
            pos[1]++;
          }
          break;
        default:
          break;
      }
    })
    return keypad[pos[0]][pos[1]];
  }).join('');
}

decode(instructions, keypadNormal, part1start);
decode(instructions, keypadByCommittee, part2start);

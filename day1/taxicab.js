var instructions = require('./instructions.js').split(', ');

function toBunnyHQ(data) {
  var directions = instructions.map(function(leg) {
    return {
      turn: leg.slice(0, 1),
      steps: leg.slice(1)
    }
  });

  var compass = {
    'n': { 'L': 'w', 'R': 'e', venture: 'x' },
    's': { 'L': 'e', 'R': 'w', venture: 'x' },
    'e': { 'L': 'n', 'R': 's', venture: 'y' },
    'w': { 'L': 's', 'R': 'n', venture: 'y' }
  }

  var hq = directions.reduce(function(journey, leg) {
    var orientation = journey.currentOrientation,
    turn = leg['turn'],
    nextOrientation = compass[orientation][turn],
    distance = Math.abs(leg.steps),
    plane = compass[orientation]['venture'];

    if (nextOrientation === 'w' || nextOrientation === 's') {
      distance = -Math.abs(distance);
    }

    journey[plane] += distance;
    journey.currentOrientation = nextOrientation;
    return journey;
  }, { x: 0, y: 0, currentOrientation: 'n' });
  return Math.abs(hq.x) + Math.abs(hq.y);
}

toBunnyHQ(instructions);

var fs = require('fs');

var scramble =
  fs.readFileSync('input.txt', 'utf-8').trim().split('\n');

function mostFrequentChar(dict) {
  var topNum = 0,
      topLetter = '';

  for (var letter in dict || topNum === 0) {
    if (dict[letter] > topNum) {
      topNum = dict[letter];
      topLetter = letter;
    }
  }
  return topLetter;
}

function leastCommonChar(dict) {
  var leastNum = 0,
      leastLetter = '';

  for (var letter in dict) {
    if (dict[letter] < leastNum || leastNum === 0) {
      leastNum = dict[letter];
      leastLetter = letter;
    }
  }
  return leastLetter;
}

function decode(scrambledStrings, test) {
  var len = scrambledStrings[0].length;
  var dict = {}, message = '';

  scrambledStrings.forEach(function(item){
    for (var i = 0; i < item.length; i++) {
      var currentLetter = item[i];

      if ( !dict[i] ) { dict[i] = {}; }

      if ( !dict[i][currentLetter] ) {
        dict[i][currentLetter] = 1;
      } else {
        dict[i][currentLetter]++;
      }
    }
  });

  for (var i = 0; i <= len; i++) {
    message += test(dict[i]);
  }
  return message;
};

console.log(decode(scramble, leastCommonChar));

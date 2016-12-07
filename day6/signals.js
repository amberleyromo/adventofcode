var fs = require('fs');

var scramble =
  fs.readFileSync('input.txt', 'utf-8').trim().split('\n');

function mostFrequentChar(dict) {
  var topNum = 0, topLetter = '';

  for (var letter in dict) {
    if (dict[letter] > topNum) {
      topNum = dict[letter];
      topLetter = letter;
    }
  }

  return topLetter;
}

function decode(scrambledStrings) {
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
    message += mostFrequentChar(dict[i]);
  }

  return message;
};

console.log(decode(scramble));

var md5 = require('md5');
var doorId = 'uqwqemis';

function generatePassword(id){
  var count = 0, pw = '';

  while (pw.length < 8) {
    var hash = md5(id + count);
    if (hash.startsWith('00000')) {
      pw += hash.charAt(5);
    }
    count++;
  }

  return pw;
}

generatePassword(doorId);

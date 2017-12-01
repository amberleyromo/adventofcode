var fs = require('fs');

var addressList =
  fs.readFileSync('input.txt', 'utf-8').trim().split('\n')

function formatAddresses(addressData) {
  return addressData.map(function(address){
    var bracketed = [], unbracketed = [];
    var build = '', isBracketed = false;

    for(var i = 0; i < address.length; i++) {
      var char = address.charAt(i);
      if (char === '[') {
        isBracketed = true;
        unbracketed.push(build);
        build = '';

      } else if (char === ']') {
        isBracketed = false;
        bracketed.push(build);
        build = '';
      } else {
        build += char;
      }
    }
    
    if (!isBracketed) { unbracketed.push(build) };

    return {
      bracketed: bracketed,
      unbracketed: unbracketed
    }
  })
}

function testABBA(phrases){
  var flag = false;

  phrases.forEach(function(phrase) {
    for (var i = 0; i < phrase.length - 3; i++) {
      if (phrase.charAt(i) !== phrase.charAt(i+1) &&
          phrase.charAt(i+1) === phrase.charAt(i+2) &&
          phrase.charAt(i) === phrase.charAt(i+3)
      ) { flag = true; }
    }
  });

  return flag;
}

function makeABA(phrases) {
  var ABA = [];

  phrases.forEach(function(phrase) {
    for (var i = 0; i < phrase.length; i++) {
      if (phrase.charAt(i) !== phrase.charAt(i+1) &&
          phrase.charAt(i) === phrase.charAt(i+2)
      ) { ABA.push(phrase.slice(i, i+3)) }
    }
  });
  return ABA;
}

function anyMatch(a, b) {
    return a.some(function (x) {
        return b.indexOf(x) >= 0;
    });
};

function decodeTLS(rawAddresses){
  var formattedAddresses = formatAddresses(rawAddresses);

  var TLSaddresses = formattedAddresses.filter(function(address){
    return testABBA(address.unbracketed) && !testABBA(address.bracketed);
  })
  return TLSaddresses.length;
};

function decodeSSL(rawAddresses){
  var formattedAddresses = formatAddresses(rawAddresses);

  var SSLaddresses = formattedAddresses.filter(function(address){
    var ABA = makeABA(address.unbracketed);
    var mirrorABA = ABA.map(function(zzz){
      return zzz.charAt(1) + zzz.charAt(0) + zzz.charAt(1);
    });
    var BAB = makeABA(address.bracketed);
    return anyMatch(mirrorABA, BAB);
  })
  return SSLaddresses.length;
};

console.log(decodeTLS(addressList));
console.log(decodeSSL(addressList));

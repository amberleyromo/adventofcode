var fs = require('fs');

var rooms =
  fs.readFileSync('input.txt', 'utf-8').trim().split('\n')
    .map(function(room) { return room.split('-'); });

function formatRoomData(possibleRooms){
  return possibleRooms.map(function(room){
    var roomName = '', sectorId, checksum = '';

    room.forEach(function(chunk){
      if ( /^[a-zA-Z]+$/.test(chunk) ) {
        roomName += chunk;
      }

      var hasChecksum = /\[(.*?)\]/.exec(chunk);
      if (hasChecksum) { checksum = hasChecksum[1] };

      var hasSectorId = /\d+/.exec(chunk);
      if (hasSectorId) { sectorId = parseInt(hasSectorId[0]); };
    })

    return {
      encryptedName: roomName,
      sectorId: sectorId,
      checksum: checksum
    }
  });
}

function letterCount(str){
  str = str.split('').sort().join('');
  var dict = {};
  for (let letter of str) {
    dict[letter] ? dict[letter]++ : dict[letter] = 1;
  }
  return dict;
}

function orderChars(dict) {
  var orderedChars = [];

  for (var char in dict) {
    if (orderedChars.length == 0) {
      orderedChars.push(char);
    } else {
      var len = orderedChars.length, flag = false;
      for (var i = 0; i < len; i++) {
        if (dict[char] > dict[orderedChars[i]] && !flag) {
          flag = true;
          orderedChars.splice(i, 0, char);
        } else if (!flag && i == len-1) {
          orderedChars.push(char);
        }
      }
    }
  }

  return orderedChars.slice(0,5).join('');
}

function decrypt(input) {
  var possibleRooms = formatRoomData(rooms);

  var legitRooms = possibleRooms.filter(function (room) {
    var possibleChecksum = orderChars(letterCount(room.encryptedName));
    return possibleChecksum === room.checksum;
  });

  return legitRooms.reduce(function(total, room) {
    return total + room.sectorId;
  }, 0);
}

console.log(decrypt(rooms));

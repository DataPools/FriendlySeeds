  var seed = 0;
  //This is the 'A' char
  var minValue = 65;
  //This is the 'z' char
  var maxValue = 122;
  onmessage = function(e) {
    seed = e.data;
    findFriendlySeed(seed);
   };
  function findFriendlySeed(seed) {
  var previousHashes = new Map();
  var maxWordLen = 50;
  for (var j = 1; j <= maxWordLen; j++) {
      var arr = new Array(j);
      previousHashes = new Map();
			for(var i=0;i<arr.length-1;i++) {
				arr[i] = String.fromCharCode(minValue);
			}
      arr[arr.length-1] = String.fromCharCode(minValue-1);
      while(increment(arr)) {
          var hash = hashCode(arr);
          if(hash == seed) {
            postMessage(arr.join(''));
          }
          previousHashes.set(hash,arr.join(''));
          //The "| 0" is needed to simulate 32 bit integer overflow that Java ints have
          var ourYHashCode = seed-((31 ** j)*hash) | 0;
          if(previousHashes.has(ourYHashCode)) {
            postMessage(arr.join('')+previousHashes.get(ourYHashCode));
          }
				}
      }
      postMessage("Could Not Find Seed");
  }


function increment(arr) {
		if(arr[0].charCodeAt(0) > maxValue) {
			return false;
		}
		arr[arr.length-1] = nextChar(arr[arr.length-1]);
		for(var i=arr.length-1;i>0;i--) {
			if(arr[i].charCodeAt(0) > maxValue) {
				arr[i] = String.fromCharCode(minValue);
				if(i > 0) {
					arr[i-1] = nextChar(arr[i-1]);
				}
			}
		}
		return arr[0].charCodeAt(0) <= maxValue;
	}

  function nextChar(c) {
      return String.fromCharCode(c.charCodeAt(0) + 1);
  }

function hashCode(value) {
  var h = 0;
  if (value.length > 0) {
      for (var i = 0; i < value.length; i++) {
          {
              h = 31 * h + (function (c) { return c.charCodeAt == null ? c : c.charCodeAt(0); })(value[i]);
              //The "| 0" is needed to simulate 32 bit integer overflow that Java ints have
              h = h | 0;
          }
      }
  }
  return h;
}

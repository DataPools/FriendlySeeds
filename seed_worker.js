  var seed = 0;
  onmessage = function(e) {
    seed = e.data;
    findFriendlySeed(seed);
   };
  function findFriendlySeed(seed) {
  var previousHashes = new Map();
  var maxWordLen = 50;
  //This is the "!" char
  var minValue = 33;
  //This is the "~" char
  var maxValue = 126;
  for (var j = 1; j <= maxWordLen; j++) {
      var arr = new Array(j);
      previousHashes = new Map();
			for(var i=0;i<arr.length;i++) {
				arr[i] = String.fromCharCode(minValue);
			}
      while(arr[0].charCodeAt(0) < maxValue) {
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
          for(var i=1;i<arr.length;i++) {
            if(arr[i].charCodeAt(0) == maxValue) {
              var val = arr[i-1].charCodeAt(0);
              arr[i-1] = (val == maxValue) ? String.fromCharCode(minValue):String.fromCharCode(val+1);
            }
				}
        var last = arr[arr.length-1].charCodeAt(0);
				arr[arr.length-1] = (last == maxValue) ? String.fromCharCode(minValue):String.fromCharCode(last+1);
      }
  }
  postMessage("Could Not Find Seed");
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

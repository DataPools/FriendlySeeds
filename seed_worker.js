function makeSeedFriendly() {
  var seed = 0;
  onmessage = function(e) {
    seed = e;
   };
  alert("This could take up to several minutes depending on your computer. Click ok to start the conversion.");
  var wordLen = 50;
  var maxValue = 126;
  var minValue = 33;
  for (var j = 1; j <= wordLen; j++) {
      var arr = new Array(j);
			for(var i=0;i<arr.length;i++) {
				arr[i] = String.fromCharCode(minValue);
			}
      while(arr[0].charCodeAt(0) < maxValue) {
          if(hashCode(arr) == seed) {
            postMessage(arr.join(''));
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
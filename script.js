function validateInput() {
        var input = document.getElementById("inputSeed").value;
        document.getElementById("submitspinner").style.display = 'inline-block';
        document.getElementById("submitbutton").disabled = true;
        document.getElementById("generatedSeed").value = 'Computing...';
        if(input.length > 0) {
          if(input >= -2147483648 && input <= 2147483647) {
              var w = new Worker("https://friendlyseed.ishaanraja1.repl.co/seed_worker.js");
              w.postMessage(input);
              w.onmessage = function(event){
                document.getElementById("generatedSeed").value = "Seed: "+event.data;
                document.getElementById("generatedSeed").style.color = '';
              };
            }
            else {
              document.getElementById("generatedSeed").value = "Invalid score";
              document.getElementById("generatedSeed").style.color = 'red';
            }
        }
        document.getElementById("submitspinner").style.display = 'none';
        document.getElementById("submitbutton").disabled = false;
}


function hashCode(value) {
  var h = 0;
  if (value.length > 0) {
      for (var i = 0; i < value.length; i++) {
          {
              h = 31 * h + (function (c) { return c.charCodeAt == null ? c : c.charCodeAt(0); })(value[i]);
          }
          ;
      }
  }
  return h;
}

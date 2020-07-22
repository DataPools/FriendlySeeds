function validateInput() {
        var input = document.getElementById("inputSeed").value;
        document.getElementById("submitspinner").style.display = 'inline-block';
        document.getElementById("submitbutton").disabled = true;
        document.getElementById("generatedSeed").value = 'Computing...';
        if(input.length > 0) {
          if(input >= -2147483648 && input <= 2147483647) {
              var w = new Worker("./seed_worker.js");
              w.postMessage(input);
              w.onmessage = function(event){
                document.getElementById("generatedSeed").value = "Seed: "+event.data;
                document.getElementById("generatedSeed").style.color = '';
              };
              w.terminate();
            }
            else {
              document.getElementById("generatedSeed").value = "Invalid score";
              document.getElementById("generatedSeed").style.color = 'red';
            }
        }
        document.getElementById("submitspinner").style.display = 'none';
        document.getElementById("submitbutton").disabled = false;
}

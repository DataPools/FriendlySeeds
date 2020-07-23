function validateInput() {
        var input = document.getElementById("inputSeed").value;
        document.getElementById("submitspinner").style.display = 'inline-block';
        document.getElementById("submitbutton").disabled = true;
        document.getElementById("generatedSeed").value = 'Computing...';
        if(input != null && input.length > 0) {
          if(input >= -2147483648 && input <= 2147483647) {
              var w = new Worker("./seed_worker.js");
              w.postMessage(input);
              w.onmessage = function(event){
                document.getElementById("generatedSeed").value = event.data;
                finished();
                w.terminate();
              };
            }
            else {
              document.getElementById("generatedSeed").value = "Invalid seed";
              document.getElementById("generatedSeed").style.color = 'red';
              finished();
            }
        }
        else {
            document.getElementById("generatedSeed").value = "Invalid seed";
            document.getElementById("generatedSeed").style.color = 'red';
            finished();
        }
}
function finished() {
  document.getElementById("generatedSeed").style.color = '';
  document.getElementById("submitspinner").style.display = 'none';
  document.getElementById("submitbutton").disabled = false;
}

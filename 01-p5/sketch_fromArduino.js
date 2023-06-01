let port;
let connectBtn;
let numInputs = 3;
let values = [];

function fromArduinoSetup() {
  port = createSerial();

  // any other ports can be opened via a dialog after
  // user interaction (see connectBtnClick below)

  connectBtn = createButton("Set UP");
  //it should be
  //connectBtn.position(900, 500);
  //test position
  connectBtn.position(1920, 0);

  connectBtn.size(200,200)
  connectBtn.mousePressed(connectBtnClick);
}

function fromArduinoDraw() {
  // reads in complete lines and prints them at the
  // bottom of the canvas

  let str = port.readUntil("\n");

  values = int(split(str, ",")); // Split string using ' ' as a delimiter/marker and parse to int

  if (values[0]) {
    console.log(values[0]);
  }

  // changes button label based on connection status
  if (!port.opened()) {
    connectBtn.show();
    connectBtn.html("Click to Set UP Arduino Connection");
  } else {
    connectBtn.hide();
  }

  //arduino input//
  switch (values[0]) {
    case 5:
      key_input_cur = "start";
      break;
    
    case 8:
      key_input_cur = "U";
      break;
    case 9:
      key_input_cur = "D";
      break;
    case 3:
      key_input_cur = "L";
      break;
    case 4:
      key_input_cur = "R";
      break;
  }
}

function connectBtnClick() {
  if (!port.opened()) {
    port.open("Arduino", 9600);
  } else {
    port.close();
  }
}

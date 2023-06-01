let portIn;
let portOut;
let connectOutBtn;
let connectInBtn;

function connectArduino_in_setup() {
  //   createCanvas(400, 400);
  //   background(220);
  //create a Serial connection
  portIn = createSerial();
  portOut = createSerial();

  let usedPorts = usedSerialPorts();
  console.log(usedPorts);

  //manually connect each port
  //update the index number [0] to be the correct Arduino port
  if (usedPorts.length > 0) {
    portIn.open(usedPorts[0], 9600);
    portOut.open(usedPorts[1], 9600); //next index in list.
  }

  //first run you may need to select the ports via button

  connectInBtn = createButton("Connect to Arduino In");
  connectInBtn.position(0, 1080);
  connectInBtn.mousePressed(connectInBtnClick);

  connectOutBtn = createButton("Connect to Arduino Out");
  connectOutBtn.position(120, 1080);
  connectOutBtn.mousePressed(connectOutBtnClick);
}

function connectArduino_in_draw() {
  // reads in complete lines and prints them at the
  // bottom of the canvas
  //   let val = portIn.readUntil("\n");
  //   if (val.length > 0) {
  //     background(220);
  //     //display the incoming data
  //     fill(0);
  //     text(val, 10, height - 20);

  //     //do something with the data!
  //     noStroke();
  //     fill(255, 200, 0);
  //     //x,y,w,h
  //     ellipse(200, 200, val, val);
  //   }
  let str = portIn.readUntil("\n");

  values = int(split(str, ",")); // Split string using ' ' as a delimiter/marker and parse to int

  if (values[0]) {
    console.log(values[0]);
  }

  // changes button label based on connection status
  // if (!port.opened()) {
  //   connectBtn.show();
  //   connectBtn.html("Click to Set UP Arduino Connection");
  // } else {
  //   connectBtn.hide();
  // }

  //arduino input//
  switch (values[0]) {
    case 0:
      key_input_cur = "start";
      break;

    case 1:
      key_input_cur = "U";
      break;
    case 5:
      key_input_cur = "D";
      break;
    case 7:
      key_input_cur = "L";
      break;
    case 3:
      key_input_cur = "R";
      break;
    case 2:
      key_input_cur = "E";
      break;
    case 4:
      key_input_cur = "C";
      break;
    case 6:
      key_input_cur = "Z";
      break;
    case 8:
      key_input_cur = "Q";
      break;
  }
  // changes button label based on connection status
  if (!portOut.opened()) {
    connectOutBtn.html("Connect to Arduino Out");
  } else {
    connectOutBtn.html("Disconnect Out");
  }

  if (!portIn.opened()) {
    connectInBtn.html("Connect to Arduino In");
  } else {
    connectInBtn.html("Disconnect In");
  }
} //end of draw

function connectOutBtnClick() {
  if (!portOut.opened()) {
    portOut.open("Arduino", 9600);
  } else {
    portOut.close();
  }
}

function connectInBtnClick() {
  if (!portIn.opened()) {
    portIn.open("Arduino", 9600);
  } else {
    portIn.close();
  }
}

/*
Forked webserial APi port examples from
https://github.com/gohai/p5.webserial
*/

let coffeebeans_light = 0;
let umbrella_light = 0;
let score_2x_light = 0;
let score_05x_light = 0;

function sendingToArduino_in_draw() {
  //   coffeebeans_light = 1;
  //   umbrella_light = 2;
  //   score_2x_light = 3;
  //   score_05x_light = 4;

  if (frameCount % 10 == 0) {
    //every 0.5 seconds
    coffeebeans_light = String(coffeebeans_light); //parse into Strings
    umbrella_light = String(umbrella_light);
    score_2x_light = String(score_2x_light);
    score_05x_light = String(score_05x_light);
    //make a long string wiht ","  in between.
    //We will use the "," to split the data accurately in Arduino
    //end the String message with '\n' to signify a new line of data
    portOut.write(
      coffeebeans_light +
        "," +
        umbrella_light +
        "," +
        score_05x_light +
        "," +
        score_2x_light +
        "\n"
    );
  }
}

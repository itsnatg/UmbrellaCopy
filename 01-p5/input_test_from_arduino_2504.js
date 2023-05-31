let serialDevice;
let incomingData;
let inputBuffer = "";
const GESTURES = [ "left", "right", "up", "down", "up-left", "up-right", "down-left", "down-right", "jump"]; //put your labels in here.
let prob = 0;
let trainedInfo = "";
let winner = "";
let gest = "";
let p = [];
let connectButton;
let col = ["#2ec4b6", "#ff9f1c", "#E86A92"];
let bgCol = ["#cbf3f0", "#FFBF699B", "#E86A924C"];

function setup() {
  createCanvas(1000, 600);
  textFont("Source Code Pro");
  // Create a 'Connect' button
  connectButton = createButton("Connect");
  connectButton.mousePressed(connectToUsb);
  //set probability to zero on start
  for (var i = 0; i < GESTURES.length; i++) {
    p[i] = 0;
  }
}

function connectToUsb() {
  if (!!serialDevice) return;
  serialDevice = new SerialDevice(
    9600,
    (data) => serialRead(data),
    (err) => serialError(err)
  );
  connectButton.html("Disconnect");
}

//------------------------------------------
// Parse Serial
//------------------------------------------

function parseSerialBuffer(buffer)
{
  console.log("Parsing " + buffer);
  //catch invalid JSON
  //ignore incomplete or double serial strings.
  try {
    const json = JSON.parse(buffer);
    processData(json); //only process Data if valid JSON
  } catch (e) {
    console.log("invalid json");
  }
}

/// Read Serial

function serialRead(data) {
  // Read data from the serial buffer
  for(let n = 0; n < data.length; ++n)
  {
    let c = data[n];
    // copy data to temp buffer
    inputBuffer += c;
    if('\n' == c){
      // when we find a newline, we process what we have so far
      parseSerialBuffer(inputBuffer);
      // and then start over
      inputBuffer = "";
    }
  }
}


function processData(_data) {
  trainedInfo = _data;
  if (trainedInfo) {
    //is there data?
    //console.log(trainedInfo);
    gest = String(trainedInfo[0].gesture); //read gesture
    prob = parseFloat(trainedInfo[0].probability); //read probability
    //console.log(prob)
    winner = String(trainedInfo[0].winner); //read winner

    //display probability values for each gesture.
    for (var i = 0; i < GESTURES.length; i++) {
      if (gest === GESTURES[i]) {
        p[i] = prob;
      }
    }
  }
}
function serialError(err) {
  print("Error:", err);
}

function draw() {
  background("#f8f9fa");
  textAlign(LEFT, TOP);
  textSize(24);
  noStroke();
  fill("#4C5454");
  text("Winner is ...", 200, height - 200);
  textSize(72);
  text(winner, 220, height - 170);

  //long hand way of displaying each bit of data but easy for others to follow and do things with.

  textAlign(LEFT, TOP);
  textSize(18);
  fill("#cbf3f0");
  rect(70, 45, width - 500, 30, 8);
  fill("#2ec4b6");
  rect(70, 45, (width - 500) * p[0], 30, 8);
  text(GESTURES[0], 10, 50);

  fill("#FFBF699B");
  rect(70, 95, width - 500, 30, 8);
  fill("#ff9f1c");
  rect(70, 95, (width - 500) * p[1], 30, 8);
  text(GESTURES[1], 10, 100);
  
  fill("#FFBF699B");
  rect(70, 145, width - 500, 30, 8);
  fill("#ff9f1c");
  rect(70, 145, (width - 500) * p[2], 30, 8);
  text(GESTURES[2], 10, 150);
  
  fill("#FFBF699B");
  rect(70, 195, width - 500, 30, 8);
  fill("#ff9f1c");
  rect(70, 195, (width - 500) * p[3], 30, 8);
  text(GESTURES[3], 10, 200);
  
  fill("#FFBF699B");
  rect(70, 245, width - 500, 30, 8);
  fill("#ff9f1c");
  rect(70, 245, (width - 500) * p[4], 30, 8);
  text(GESTURES[4], 10, 250);
  
  fill("#FFBF699B");
  rect(70, 295, width - 500, 30, 8);
  fill("#ff9f1c");
  rect(70, 295, (width - 500) * p[5], 30, 8);
  text(GESTURES[5], 10, 300);
  
  fill("#FFBF699B");
  rect(70, 345, width - 500, 30, 8);
  fill("#ff9f1c");
  rect(70, 345, (width - 500) * p[6], 30, 8);
  text(GESTURES[6], 10, 350);
  
  fill("#FFBF699B");
  rect(70, 395, width - 500, 30, 8);
  fill("#ff9f1c");
  rect(70, 395, (width - 500) * p[7], 30, 8);
  text(GESTURES[7], 10, 400);
  
  fill("#FFBF699B");
  rect(70, 445, width - 500, 30, 8);
  fill("#ff9f1c");
  rect(70, 445, (width - 500) * p[8], 30, 8);
  text(GESTURES[8], 10, 450);

  textAlign(LEFT, TOP);
  textSize(12);
  noStroke();
  fill("#4C5454");
  text(p[0],10,10)
  text(nf(p[0] * 100) + "%", 75 + (width - 500) * p[0], 55);
  text(nf(p[1] * 100) + "%", 75 + (width - 500) * p[1], 105);
  text(nf(p[1] * 100) + "%", 75 + (width - 500) * p[2], 155);
  text(nf(p[1] * 100) + "%", 75 + (width - 500) * p[3], 205);
  text(nf(p[1] * 100) + "%", 75 + (width - 500) * p[4], 255);
  text(nf(p[1] * 100) + "%", 75 + (width - 500) * p[5], 305);
  text(nf(p[1] * 100) + "%", 75 + (width - 500) * p[6], 355);
  text(nf(p[1] * 100) + "%", 75 + (width - 500) * p[7], 405);
  text(nf(p[1] * 100) + "%", 75 + (width - 500) * p[8], 455);


  //more efficient display of data especially if more than 2 gestures. Comment in line 131 and comment out lines 106 - 126.
   
  // drawOutputs(); 
  
  
  if (winner === GESTURES[0]) {
    //do something with the winning gesture
  }
  
  
  else if (winner === GESTURES[1]) {
    //do something with the winning gesture
  }
  

}

//------------------------------------------
//if you have more than 3 categories use the drawOutputs() function instead.
//
function drawOutputs() {
  if (p.length > 0) {
      for (var i = 0; i < GESTURES.length; i++) {
        var ithLabel = GESTURES[i];
          var ithConfidence = p[i];

          fill(bgCol[i]);
          rect(10, 10 + i * 30, 75 + (width - 500), 25, 6);
          fill(col[i]);
          rect(10, 10 + i * 30, (width - 500) * ithConfidence, 25, 6);
          var str = ithLabel + ": ";
          str += nf(ithConfidence, 1, 1);
          fill("#4C5454");
          noStroke();
          textAlign(LEFT, TOP);
          text(str + "%", 15, 15 + i * 30);
        }
      }

}

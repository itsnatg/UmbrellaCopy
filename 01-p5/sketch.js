//Umbrella project
//By Paxton Wang and Natalia

let clr_list = "729ea1-b5bd89-dfbe99-ec9192-db5375"
  .split("-")
  .map((a) => "#" + a);

let canvas_width = 1920;
let canvas_height = 1080;

function preload() {
  point_image_preload();

  //ripple_preload();

  //fromArduinoSetup();
  
}

function setup() {
  createCanvas(canvas_width, canvas_height);
  soundPreload();
  angleMode(DEGREES);
  ellipseMode(CORNER);
  frameRate(60)
  
connectArduino_in_setup();
}

function draw() {
  
  image(img_background, 0, 0, width, height);
  
  //image(img_rain, 25, -25, width, height);
  //s_background_music.play();
  //tint(255,255,200, 200);

  // if (key_input_cur !== 0) {
  //   //console.log(player_cur_x_pos + "," + player_cur_y_pos);
  //   console.log(key_input_cur);
  // }
  //s_rain.play();

    if (frameCount % 60 == 0) {
      //print(player_cur_x_pos + "," + player_cur_y_pos);
    }
  ////trun back on the line above when testing needed
  

  //fromArduinoDraw();
  connectArduino_in_draw();
  sendingToArduino_in_draw();

  if (game_playing_stat) {
    image(img_rain, 0, 0, width, height);
    for (let point of points) {
      point.draw();
      point.update();
    }
    if (!players[0]) {
      character_setup();
    }
    for (let player of players) {
      player.draw();
      player.update();
    }

    level_control_in_draw();
    wind_in_draw();
  }
  starting_process_in_draw();
  score_display_in_draw();
  adding_items_in_draw();
  starting_process();
  counting_score();
  detect_if_game_over();
  show_power_items();
  opp_in_draw();
}

function keyPressed() {
  if (keyCode === LEFT_ARROW || keyCode === 65) {
    key_input_cur = "L";
  } else if (keyCode === RIGHT_ARROW || keyCode === 68) {
    key_input_cur = "R";
  } else if (keyCode === UP_ARROW || keyCode === 87) {
    key_input_cur = "U";
  } else if (keyCode === DOWN_ARROW || keyCode === 88) {
    key_input_cur = "D";
  } else if (keyCode === 81) {
    key_input_cur = "Q";
  } else if (keyCode === 69) {
    key_input_cur = "E";
  } else if (keyCode === 90) {
    key_input_cur = "Z";
  } else if (keyCode === 67) {
    key_input_cur = "C";
  } else if (keyCode === 32) {
    start_button_pressed = true;
  }
  print("key:" + key_input_cur);
}

function easeOutQuint(x) {
  return 1 - Math.pow(1 - x, 5);
}

let step_on_water = false;
let game_is_over = false;

//starting page
let start_page_canvas;
let game_start_button;
let game_rules_page_button;

let have_click_play = false;
let have_click_start = false;
let show_start_page = true;
let show_instroction_page = false;

let starting_game_stat = true;
let game_playing_stat = false;
let lastCalledTime = 0;
const delay = 500; // in milliseconds

let start_button_pressed = false;

function starting_process_in_draw() {
  if (key_input_cur == "start") {
    start_button_pressed = true;
    key_input_cur = 0;
  }
  if (
    show_start_page &&
    start_button_pressed &&
    millis() - lastCalledTime > delay
  ) {
    game_play_button_func();
    console.log("click play");
    lastCalledTime = millis();
    start_button_pressed = false;
  }
  if (
    show_instroction_page &&
    start_button_pressed &&
    millis() - lastCalledTime > delay
  ) {
    game_start_button_func();
    console.log("click start");
    lastCalledTime = millis();
    start_button_pressed = false;
  }
  if (
    game_is_over &&
    start_button_pressed &&
    millis() - lastCalledTime > delay
  ) {
    starting_game_stat = true;
    game_is_over = false;
    console.log("click replay");
    lastCalledTime = millis();
    start_button_pressed = false;
  }
  start_button_pressed = false;
}

function game_play_button_func() {
  show_start_page = false;
  have_click_play = true;
  show_instroction_page = true;
  s_game_instruction.play();
}
function game_start_button_func() {
  show_instroction_page = false;
  have_click_start = true;
  game_playing_stat = true;
  point_setup();
  //character_setup();
  s_game_start.play();
  s_game_over.stop();
  //s_background_music.play();
}

function starting_process() {
  if (starting_game_stat) {
    have_click_start = false;
    have_click_play = false;
    show_start_page = true;
    show_instroction_page = false;
    starting_game_stat = false;
  }
  if (show_start_page) {
    start_page();
  }
  if (show_instroction_page) {
    instroction_page();
  }
}

function start_page() {
  push();
  noStroke();
  fill(255, 200, 0, 220);
  rect(
    canvas_width * 0.1,
    canvas_height * 0.1,
    canvas_width * 0.8,
    canvas_height * 0.8,
    100
  );
  fill(255);
  textSize(50);
  textAlign(CENTER);
  text("Welcome", width / 2, height / 2);
  pop();
}

function instroction_page() {
  push();
  noStroke();
  fill(20, 141, 165, 220);
  rect(
    canvas_width * 0.1,
    canvas_height * 0.1,
    canvas_width * 0.8,
    canvas_height * 0.8,
    100
  );
  fill(255);
  textSize(40);
  textAlign(CENTER);
  text("Here are the instructions!", width / 2, height / 5);
  image(img_instructions, 0, 0, width, height);
  pop();
}

function detect_if_game_over() {
  if (step_on_water) {
    ending_score = play_score;
    let last_time_score = getItem("last score") || "no record";
    ending_score_text =
      "move_steps: " +
      move_steps +
      "\ncatch_animals: " +
      catch_animals +
      "\ncatch_woodpecker: " +
      catch_woodpecker +
      "\ncatch_coffee_bean: " +
      catch_coffee_bean +
      "\n 2x point: " +
      bonusSocre_2x +
      "\n 0.5x point: " +
      subtractScore_05x +
      "\n last time score: " +
      last_time_score;
    game_is_over = true;

    s_game_over.play();
    //s_background_music.stop();
    s_collect_item.stop();
    s_game_award.stop();
    s_level_up.stop();
    s_score_point.stop();
    s_game_instruction.stop();
    s_neg_item.stop();
    s_neg_noti.stop();
    s_collect_umbrella.stop();
    s_snail.stop();
    s_frog.stop();
    s_wind.stop();
    s_game_start.stop();
    s_rain.stop();
    s_background_music.stop();
    s_step_on_water_with_boots.stop();
    step_on_water = false;
    storeItem("last score", ending_score);
  }

  if (game_is_over) {
    game_over_page();
    clean_score();
    game_playing_stat = false;
    players = [];
    cur_pw_items = [];
    points = [];
    winds = [];
    cur_pw_items = [];
    level_cur = 1;
    level_timer = 0;
  }
}

function game_over_page() {
  push();
  noStroke();
  fill(220, 20, 60, 150);
  rect(
    canvas_width * 0.1,
    canvas_height * 0.1,
    canvas_width * 0.8,
    canvas_height * 0.8,
    100
  );
  fill(255);
  textSize(40);
  textAlign(CENTER);
  image(img_gameover, width / 3.3, 20);
  //text("GAME OVER!", width / 2, height / 2);
  text("You stepped on the toxic water ", width / 2, height / 2 + 40);
  text("Your score is: " + ending_score, width / 2, height / 2 + 70);
  text(ending_score_text, width / 2, height / 2 + 110);
  //text("Nice Play!", width / 2, height / 2 + 500);
  pop();
}

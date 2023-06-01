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
const delay = 250; // in milliseconds

let start_button_pressed = false;
let ending_level;

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
    millis() - lastCalledTime > delay &&
    typed_name
  ) {
    starting_game_stat = true;
    game_is_over = false;
    console.log("click replay");
    lastCalledTime = millis();
    start_button_pressed = false;
    typed_name = false;
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

let top_score_array = [];
let top_score_timer = 0;
let typed_name = false;

function top_score() {
  // Retrieving the string
  let retString = localStorage.getItem("top_score");
  let retArray;
  // Retrieved array
  if (retString) {
    retArray = JSON.parse(retString);
  } else {
    //if no exist
    retArray = [];
  }

  let person = prompt("Please enter your name:", "Jerry");
  let record;
  if (person) {
    record = {
      score: ending_score,
      name: person,
      level: ending_level,
      time: get_time(),
      game_data: ending_score_text,
    };
  } else {
    record = {
      score: ending_score,
      name: "Anonymous",
      level: ending_level,
      time: get_time(),
      game_data: ending_score_text,
    };
  }

  retArray.push(record);
  let string = JSON.stringify(retArray);
  localStorage.setItem("top_score", string);

  top_score_array = retArray;
  top_score_array.sort((a, b) => b.score - a.score);
  print(top_score_array);
  typed_name = true;
}

function detect_if_game_over() {
  if (step_on_water) {
    ending_score = play_score;
    ending_level = level_cur;
    ending_score_text =
      "move_steps(10pt): " +
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
      "\n final level: " +
      ending_level;
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

    top_score_timer = millis();
    step_on_water = false;
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

////////get system time function///////////////////
let record_sys_time_full;

function get_time() {
  let now = new Date();
  let day = now.getDate();
  let month = now.getMonth() + 1; // Adding 1 since January is represented by 0
  let year = now.getFullYear();
  let hours = now.getHours();
  let minutes = now.getMinutes();

  // Formatting the date and time
  let formattedDate = pad(day) + "/" + pad(month) + "/" + year;
  let formattedTime = pad(hours) + ":" + pad(minutes);

  // Displaying the date and time on the canvas

  record_sys_time_full = formattedDate + " " + formattedTime;

  return record_sys_time_full;
}

// Function to pad single-digit numbers with a leading zero
function pad(number) {
  return (number < 10 ? "0" : "") + number;
}

////////get system time function///////////////////

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
  text("You stepped on the toxic water ", width / 2, height / 2 + 70);
  text("Your score is: " + ending_score, width / 2, height / 2 + 120);
  textSize(20);
  text(ending_score_text, width / 2, height / 2 + 150);
  //text("Nice Play!", width / 2, height / 2 + 500);
  if (top_score_timer == 0) {
    textSize(15);
    text("TOP 10 Genius", 300, 700);
    for (let i = 0; i < top_score_array.length; i++) {
      if (i > 9) {
        return;
      }
      const score = top_score_array[i];
      if (score) {
        text(
          score.name + "   " + score.score + "   level " + score.level,
          300,
          720 + i * 20
        );
      }
    }
  }

  pop();

  if (millis() - top_score_timer > 2000 && top_score_timer !== 0) {
    top_score();
    top_score_timer = 0;
  }
}

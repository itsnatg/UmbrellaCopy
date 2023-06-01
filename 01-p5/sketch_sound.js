let s_collect_item;
let s_game_award;
let s_level_up;
let s_score_point;
let s_game_start;
let s_collect_umbrella;
let s_snail;
let s_frog;
let s_wind;
let s_woodpecker;
let s_start_button;
let s_rain;
let s_background_music;

function soundPreload() {
  s_collect_item = loadSound("file/sounds/Collect_Item.mp3");
  s_game_award = loadSound("file/sounds/Game_Award_3.mp3");
  s_level_up = loadSound("file/sounds/Level_Up.mp3");
  s_score_point = loadSound("file/sounds/Scoring_Point.mp3");
  s_game_instruction = loadSound("file/sounds/Game_instrction.mp3");
  s_neg_item = loadSound("file/sounds/Game_Neg_3.mp3");
  s_neg_noti = loadSound("file/sounds/Fail_2.mp3");
  s_game_over = loadSound("file/sounds/Game_over.mp3");
  s_collect_umbrella = loadSound("file/sounds/umbrella_Glitched.wav");
  s_snail = loadSound("file/sounds/snail_move.mp3");
  s_frog = loadSound("file/sounds/frog_jump.wav");
  s_wind = loadSound("file/sounds/wind.mp3");
  s_game_start = loadSound("file/sounds/Game_Start.wav");
  s_rain = loadSound("file/sounds/RainLoop.wav");
  s_background_music = loadSound("file/sounds/background_sound.mp3");
  s_step_on_water_with_boots = loadSound(
    "file/sounds/step_on_water_with_boots.mp3"
  );
}

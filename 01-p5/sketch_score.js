let play_score = 0;
let move_steps = 0;
let catch_animals = 0;
let catch_woodpecker = 0;
let bonusSocre_2x = 0;
let subtractScore_05x = 0;
let catch_coffee_bean = -40;

let ending_score;
let ending_score_text;

let catch_animals_point = 40;
let catch_woodpecker_point = 990;



function counting_score() {
  play_score =
    move_steps * 10 +
    catch_animals * catch_animals_point +
    catch_woodpecker * catch_woodpecker_point +
    (catch_coffee_bean % 40) +
    bonusSocre_2x +
    subtractScore_05x;
}

function clean_score() {
   play_score = 0;
   move_steps = 0;
   catch_animals = 0;
   catch_woodpecker = 0;
   catch_coffee_bean = 0;
  bonusSocre_2x = 0;
  subtractScore_05x = 0;
}


function score_display_in_draw() {
  //game score display
  push();
  fill(255);
  textSize(80);
  textAlign(CENTER);
  text(play_score, width / 2, 80);
  text("Lv." + level_cur, width / 2 - 400, 130);

  //dev tools
  //dev map img
  textSize(20);
  //text("Develop map mode. To hide it, motify in draw function", width / 2, 150);
  //tint(255, 67);
  //image(img_map_dev, 190, 150, 1550, 730);
  //text(int(mouseX) + "," + int(mouseY), width / 2 - 400, 150);
  //text(cur_pw_items, width / 2 - 500, 130);
  pop();
}


/////score adding animations on character

let add_score = [];
let add_score_y_pos = 0;
let add_score_transp = 300;

let add_score_t_1;
let add_score_t_2;

function adding_score_ani(x, y) {
  if (add_score[0]) {
    add_score_t_1 = add_score[0];
    add_score.splice(0, 1);
    add_score_y_pos = 0;
    add_score_transp = 400;
  }
  if (add_score_t_1) {
    push();
    translate(x, y);
    translate(0, add_score_y_pos);

    fill(255, add_score_transp);
    textSize(50);
    text(add_score_t_1, 0, 0);
    add_score_y_pos -= 4;
    add_score_transp -= 15;
    pop();
    if (add_score_transp < 0) {
      add_score_t_1 = null;
      add_score_y_pos = 0;
      add_score_transp = 400;
    }
  }
}

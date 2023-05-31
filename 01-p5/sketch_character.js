let players = [];

let key_input_cur = 0;

let player_cur_x_pos;
let player_cur_y_pos;

function character_setup() {
  let char_x, char_y;
  for (let a = 45; a < points.length; a++) {
    let point_x = points[a].x;
    let point_y = points[a].y;
    let if_visable = points[a].if_visable;
    let spot_kind = points[a].spot_kind;
    if (if_visable && spot_kind == "blank") {
      pointFound = true;
      char_x = point_x;
      char_y = point_y;
      console.log("found the spot!");
      player_cur_x_pos = points[a].x_num;
      player_cur_y_pos = points[a].y_num;
      break;
    }
  }

  let user = new Character(char_x, char_y);

  players.push(user);
}

let timer_left = 0;
let timer_right = 0;
let timer_up = 0;
let timer_down = 0;

let x_return_left = 0;
let x_return_right = 0;
let y_return_up = 0;
let y_return_down = 0;

let x_plus_left = 0;
let x_plus_right = 0;
let y_plus_up = 0;
let y_plus_down = 0;

let p_x_plus_left = 0;
let p_x_plus_right = 0;
let p_y_plus_up = 0;
let p_y_plus_down = 0;

let trans_speed = 0.2;

class Character {
  constructor(x, y) {
    this.x = x || width / (x_point_gap_denominator * 2);
    this.y = y || height / (y_point_gap_denominator * 2);
    this.left = false;
    this.right = false;
    this.up = false;
    this.down = false;
  }

  draw() {
    push();
    translate(this.x, this.y);

    rectMode(CENTER);
    imageMode(CENTER);
    image(img_player, -5, -15, 210, 210);
    adding_score_ani(0, 0);
    if (cur_holding_boots > 0) {
      ellipseMode(CENTER);
      ellipse(50, 50, 40);
      image(img_boots, 50, 50, 30, 30);
      textSize(20);
      textAlign(CENTER);
      fill(255);
      text(cur_holding_boots, 75, 70);
    }

    pop();
  }

  update() {
    //check the spot is exist
    let x_point_gap = width / x_point_gap_denominator;
    let y_point_gap = height / y_point_gap_denominator;
    switch (key_input_cur) {
      case "R":
        findPoint(this.x + x_point_gap, this.y, points, () => {
          this.right = true;
          move_steps++;
        });
        break;
      case "L":
        findPoint(this.x - x_point_gap, this.y, points, () => {
          this.left = true;
          move_steps++;
        });

        break;
      case "U":
        findPoint(this.x, this.y - y_point_gap, points, () => {
          this.up = true;
          move_steps++;
        });
        break;
      case "D":
        findPoint(this.x, this.y + y_point_gap, points, () => {
          this.down = true;
          move_steps++;
        });
        break;
      case "Q":
        findPoint(this.x - x_point_gap, this.y - y_point_gap, points, () => {
          this.up = true;
          this.left = true;
          move_steps++;
        });
        break;
      case "E":
        findPoint(this.x + x_point_gap, this.y - y_point_gap, points, () => {
          this.up = true;
          this.right = true;
          move_steps++;
        });
        break;
      case "Z":
        findPoint(this.x - x_point_gap, this.y + y_point_gap, points, () => {
          this.down = true;
          this.left = true;
          move_steps++;
        });
        break;
      case "C":
        findPoint(this.x + x_point_gap, this.y + y_point_gap, points, () => {
          this.down = true;
          this.right = true;
          move_steps++;
        });
        break;
      case "start":
        break;
      default:
        //consolkey_input_cur = 0;e.log("Invalid input" + key_input_cur);
        key_input_cur = 0;
        break;
    }

    function findPoint(check_x, check_y, points, callback) {
      let pointFound = false;
      for (let a = 0; a < points.length; a++) {
        let point_x = points[a].x;
        let point_y = points[a].y;
        let if_visable = points[a].if_visable;
        let spot_kind = points[a].spot_kind;
        if (
          Math.abs(check_x - point_x) < 1 &&
          Math.abs(check_y - point_y) < 1 &&
          if_visable
        ) {
          pointFound = true;
          player_cur_x_pos = points[a].x_num;
          player_cur_y_pos = points[a].y_num;
          callback();
          print(spot_kind);
          //console.log(check_x + " " + point_x + " " + check_y + " " + point_y);
          switch (spot_kind) {
            case "frog":
              if (cur_pw_items.indexOf("coffeeBeans") < 0) {
                catch_animals++;

                if (pw_item_score2x_activate) {
                  bonusSocre_2x += catch_animals_point;
                  add_score.push("+80");
                } else if (pw_item_score05x_activate) {
                  subtractScore_05x -= catch_animals_point / 2;
                  add_score.push("+20");
                } else {
                  add_score.push("+40");
                }
                s_frog.play();
                s_score_point.play();
                points[a].random_kind = 0;
                points[a].spot_kind = "blank";
              } else {
                s_neg_noti.play();
                console.log("you got a coffeeBeans on you!");
              }

              break;
            case "snail":
              if (cur_pw_items.indexOf("coffeeBeans") < 0) {
                catch_animals++;

                if (pw_item_score2x_activate) {
                  bonusSocre_2x += catch_animals_point;
                  add_score.push("+80");
                } else if (pw_item_score05x_activate) {
                  subtractScore_05x -= catch_animals_point / 2;
                  add_score.push("+20");
                } else {
                  add_score.push("+40");
                }
                s_snail.play();
                s_score_point.play();
                points[a].random_kind = 0;
                points[a].spot_kind = "blank";
              } else {
                s_neg_noti.play();
                console.log("you got a coffeeBeans on you!");
              }
              break;
            case "water":
              if (cur_holding_boots > 0) {
                cur_holding_boots--;
                s_step_on_water_with_boots.play();
                points[a].random_kind = 0;
                points[a].spot_kind = "blank";
              } else {
                step_on_water = true;
              }
              break;
            case "woodpecker":
              catch_woodpecker++;

              if (pw_item_score2x_activate) {
                bonusSocre_2x += catch_woodpecker_point;
                add_score.push("+2000");
              } else if (pw_item_score05x_activate) {
                subtractScore_05x -= catch_woodpecker_point / 2;
                add_score.push("+500");
              } else {
                add_score.push("+1000");
              }
              s_game_award.play();
              //cur_pw_items.push("woodpecker");
              points[a].random_kind = 0;
              points[a].spot_kind = "blank";
              break;
            case "coffeeBeans":
              catch_coffee_bean++;
              pw_item_coffeeBeans_add_time = millis();
              s_neg_item.play();
              if (cur_pw_items.indexOf("coffeeBeans") < 0) {
                cur_pw_items.push("coffeeBeans");
                console.log("find coffeeBeans");
              } else {
                console.log("coffeeBeans is already on!");
              }
              points[a].random_kind = 0;
              points[a].spot_kind = "blank";
              break;
            case "score2x":
              pw_item_score2x_add_time = millis();
              s_collect_item.play();
              if (cur_pw_items.indexOf("score2x") < 0) {
                cur_pw_items.push("score2x");
                console.log("find score2x");
              } else {
                console.log("score2x is already on!");
              }
              points[a].random_kind = 0;
              points[a].spot_kind = "blank";
              break;
            case "superUmbrella":
              if (cur_pw_items.indexOf("superUmbrella") < 0) {
                s_collect_umbrella.play();
                cur_pw_items.push("superUmbrella");
                pw_item_superUmbrella_add_time = millis();
                console.log("find superUmbrella");
              } else {
                s_neg_noti.play();
                console.log("superUmbrella is already on!");
              }
              points[a].random_kind = 0;
              points[a].spot_kind = "blank";
              break;
            case "boots":
              s_collect_item.play();
              console.log("get boots");
              if (cur_holding_boots < 2) {
                cur_holding_boots++;
              }
              points[a].random_kind = 0;
              points[a].spot_kind = "blank";

              /*
              pw_item_boots_add_time = millis();
              if (cur_pw_items.indexOf("boots") < 0) {
                s_collect_item.play();
                cur_pw_items.push("boots");
                pw_item_boots_add_time = millis();
                console.log("find boots");
              } else {
                s_neg_noti.play();
                console.log("boots is already on!");
              }
              
              */
              break;
            case "score05x":
              pw_item_score05x_add_time = millis();
              s_neg_item.play();
              if (cur_pw_items.indexOf("score05x") < 0) {
                cur_pw_items.push("score05x");
                console.log("find score05x");
              } else {
                console.log("score05x is already on!");
              }
              points[a].random_kind = 0;
              points[a].spot_kind = "blank";
              break;
            default:
              break;
          }

          break;
        }
      }
      if (pointFound) {
        // set some property or call some function to indicate that a point was found
        //console.log("Matching point found!");
      } else {
        if (
          (player_cur_x_pos == 1 && key_input_cur == "L") ||
          (player_cur_x_pos == 13 && key_input_cur == "R")
        ) {
          step_on_water = true;
        }

        console.log("No matching point found");
      }
      key_input_cur = 0;
    }

    //turning finction
    let x_point_gap_half = width / x_point_gap_denominator;
    let y_point_gap_half = height / y_point_gap_denominator;

    if (this.left && this.x > x_point_gap_half + 1 && timer_left <= 1) {
      x_return_left = easeOutQuint(timer_left);
      x_plus_left = map(x_return_left, 0, 1, 0, x_point_gap);
      x_plus_left -= p_x_plus_left;
      this.x -= x_plus_left;
      timer_left += trans_speed;
      p_x_plus_left += x_plus_left;
    } else {
      timer_left = 0;
      x_plus_left = 0;
      p_x_plus_left = 0;
      this.left = false;
    }

    if (
      this.right &&
      this.x < width - x_point_gap_half - 1 &&
      timer_right <= 1
    ) {
      x_return_right = easeOutQuint(timer_right);
      x_plus_right = map(x_return_right, 0, 1, 0, x_point_gap);
      x_plus_right -= p_x_plus_right;
      this.x += x_plus_right;
      timer_right += trans_speed;
      p_x_plus_right += x_plus_right;
    } else {
      timer_right = 0;
      x_plus_right = 0;
      p_x_plus_right = 0;
      this.right = false;
    }

    if (this.up && this.y > y_point_gap_half + 1 && timer_up <= 1) {
      y_return_up = easeOutQuint(timer_up);
      y_plus_up = map(y_return_up, 0, 1, 0, y_point_gap);
      y_plus_up -= p_y_plus_up;
      this.y -= y_plus_up;
      timer_up += trans_speed;
      p_y_plus_up += y_plus_up;
    } else {
      timer_up = 0;
      y_plus_up = 0;
      p_y_plus_up = 0;
      this.up = false;
    }

    if (
      this.down &&
      this.y < height - y_point_gap_half - 1 &&
      timer_down <= 1
    ) {
      y_return_down = easeOutQuint(timer_down);
      y_plus_down = map(y_return_down, 0, 1, 0, y_point_gap);
      y_plus_down -= p_y_plus_down;
      this.y += y_plus_down;
      timer_down += trans_speed;
      p_y_plus_down += y_plus_down;
    } else {
      timer_down = 0;
      y_plus_down = 0;
      p_y_plus_down = 0;
      this.down = false;
    }

    if (if_hit_by_wind && abs(last_time_hit_by_wind - millis()) > 150) {
      key_input_cur = "L";
      if_hit_by_wind = false;
      last_time_hit_by_wind = millis();
      print("if_hit_by_wind");
    }
  }
}

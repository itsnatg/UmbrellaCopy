//class point

let player_umbrella_img;
let img_player;
let img_player_up;
let img_player_down;
let img_player_left;
let img_player_right;
let img_background;
let img_rain;
let img_gameover;
let img_instructions;

let img_frog,
  img_frog_2,
  img_snail,
  img_water,
  img_water_splash,
  img_snail_2,
  img_woodpecker,
  img_coffee_beans,
  img_boots,
  img_score2x,
  img_score05x,
  img_super_umbrella;

let img_rain_1,
  img_rain_2,
  img_rain_3,
  img_rain_4,
  img_rain_5,
  img_rain_6,
  img_rain_7;

let points = [];
let piont_img_list = [
  img_frog,
  img_snail,
  img_water,
  img_player,
  img_background,
  img_water_splash,
  img_snail_2,
  img_woodpecker,
  img_frog_2,
  img_coffee_beans,
  img_rain,
  img_boots,
  img_score2x,
  img_score05x,
  img_super_umbrella,
];

//list not use
let spot_kind_list = [
  "frog",
  "snail",
  "water",
  "woodpecker",
  "coffeeBeans",
  "boots",
  "score2x",
  "score05x",
  "superUmbrella",
];

////////////////////////
function point_image_preload() {
  img_frog = loadImage("file/animals/frog-loop.gif");
  img_snail = loadImage("file/animals/Snail-loop.gif");
  img_snail_2 = loadImage("file/animals/Snail-loop-mirror.gif");
  img_water = loadImage("file/water-loop.gif");
  img_player = loadImage("file/New-Player-1.png");
  img_player_up = loadImage("file/player-up.png");
  img_player_down = loadImage("file/player-down.png");
  img_player_left = loadImage("file/player-left.png");
  img_player_right = loadImage("file/player-right.png");
  img_background = loadImage("file/background.gif");
  img_rain = loadImage("file/rain.gif");
  img_water_splash = loadImage("file/water-loop.gif");
  img_woodpecker = loadImage("file/animals/woodpecker-loop.gif");
  img_frog_2 = loadImage("file/animals/frog-loop-mirror.gif");
  img_gameover = loadImage("file/gameover.png");
  img_instructions = loadImage("file/instructions.png");

  //pw_items
  img_coffee_beans = loadImage("file/pw_items/pw_items_beans.gif");
  img_boots = loadImage("file/pw_items/pw_items_boots.gif");
  img_score2x = loadImage("file/pw_items/pw_items_score2x.gif");
  img_score05x = loadImage("file/pw_items/pw_items_score_half.gif");
  img_super_umbrella = loadImage("file/pw_items/pw_items_umbrella.gif");

  //dev tools
  img_map_dev = loadImage("file/map.png");

  //wind
  ing_wind = loadImage("file/wind-loop.gif");


  //water stagnent
  img_rain_1 = loadImage("file/rain/rain-1.png")
    img_rain_2 = loadImage("file/rain/rain-2.png")
    img_rain_3 = loadImage("file/rain/rain-3.png")
    img_rain_4 = loadImage("file/rain/rain-4.png")
    img_rain_5 = loadImage("file/rain/rain-5.png")
    img_rain_6 = loadImage("file/rain/rain-6.png")
    img_rain_7 = loadImage("file/rain/rain-7.png")
}

let x_point_gap_denominator = 16.3;
let y_point_gap_denominator = 9.1;
//generate every step point in canvas
function point_setup() {
  let x_point_gap = width / x_point_gap_denominator;
  let y_point_gap = height / y_point_gap_denominator;
  let x_num = 0;
  let y_num = 0;
  for (
    let pos_Y = height / 18 + height / 9 + 120;
    pos_Y < height - (height / 9) - 1;
    pos_Y += y_point_gap
  ) {
    y_num++;
    x_num = 0;
    for (
      let pos_X = (width / 32) * 4 + 17;
      pos_X < width - 15 - width / 16;
      pos_X += x_point_gap
    ) {
      x_num++;
      let p = new Point(pos_X, pos_Y, pos_Y * pos_X, x_num, y_num);
      points.push(p);
    }
  }
}
let adding_items_lastTriggerTime = 0;

function adding_items_in_draw() {
  if (game_playing_stat) {
    if (millis() - adding_items_lastTriggerTime >= 400) {
      // Call every 5 seconds

      add_point_items();
      adding_items_lastTriggerTime = millis();
    }
  }
  0;
}
function add_point_items() {
  let randomPoint_1 = int(random(78));
  let i = 0;
  for (i; i < points.length; i++) {
    if (
      points[randomPoint_1].spot_kind == "blank" &&
      (abs(points[randomPoint_1].x_num - player_cur_x_pos) > 2 ||
        abs(points[randomPoint_1].y_num - player_cur_y_pos) > 2)
    ) {
      //console.log(abs(points[randomPoint_1].x_num - player_cur_x_pos));
      break;
    }
    randomPoint_1 = int(random(78));
  }
  if (i < points.length) {
    points[randomPoint_1].random_kind = random(opp_active_items_total);
    points[randomPoint_1].generate_time = millis();
    //console.log("add item " + i);
  } else {
    console.log("no point to add item " + i);
  }

  i = 0;
}

//point object for every step in the canvas total 144 point
class Point {
  constructor(x, y, serial, x_num, y_num) {
    let item_size;
    this.x = x;
    this.y = y;
    this.random = int(noise(serial) * 100);
    this.clr = color(random(clr_list));
    if (level_cur == 1) {
      this.random_kind = random(100);
    } else {
      this.random_kind = random(opp_active_items_total);
    }
    
    this.x_num = x_num | "error";
    this.y_num = y_num | "error";
    this.spot_kind = "blank";

    this.if_visable = true;
    this.test = "yes";
    this.size = item_size || width / 16;
    this.generate_time = millis();
  }

  draw() {
    push();
    translate(this.x, this.y);
    ellipseMode(CENTER);
    noStroke();
    fill(this.clr);
    if (this.random_kind == 0) {
    } else if (this.random_kind < opp_upon_frog) {
      this.spot_kind = "frog";
      this.size = width / 14 - 55;
    } else if (this.random_kind < opp_upon_snail) {
      this.spot_kind = "snail";
    } else if (this.random_kind < opp_upon_water) {
      this.spot_kind = "water";
    } else if (this.random_kind < opp_upon_woodpecker) {
      this.spot_kind = "woodpecker";
    } else if (this.random_kind < opp_upon_coffeeBeans) {
      this.spot_kind = "coffeeBeans";
      this.size = width / 16 - 55;
    } else if (this.random_kind < opp_upon_boots) {
      this.spot_kind = "boots";
      this.size = width / 14 - 55;
    } else if (this.random_kind < opp_upon_score2x) {
      this.spot_kind = "score2x";
      this.size = width / 12 - 55;
    } else if (this.random_kind < opp_upon_score05x) {
      this.spot_kind = "score05x";
      this.size = width / 12 - 55;
    } else if (this.random_kind < opp_upon_superUmbrella) {
      this.spot_kind = "superUmbrella";
      this.size = width / 12 - 55;
    }
    this.random_kind = 0;
    if (this.if_visable) {
      //ellipse(0,0,this.size);
      imageMode(CENTER);
      switch (this.spot_kind) {
        case "frog":
          if (this.random > 50) {
            tint(255,240,30, 255);
            image(img_frog, 0, 0, this.size, this.size);
          } else {
            tint(255,200,255, 255);
            image(img_frog_2, 0, 0, this.size, this.size);
          }
          break;
        case "snail":
          if (this.random > 50) {
            tint(255,170,255, 255);
            
            image(img_snail, 0, 0, this.size, this.size);
          } else {
            image(img_snail_2, 0, 0, this.size, this.size);
          }
          break;
        case "water":
          if (millis() - this.generate_time < 200) {
            image(img_rain_1, 0, 0, this.size, this.size);
          } else if (millis() - this.generate_time < 400) {
            image(img_rain_2, 0, 0, this.size, this.size);
          } else if (millis() - this.generate_time < 600) {
            image(img_rain_3, 0, 0, this.size, this.size);
          } else if (millis() - this.generate_time < 1200) {
            image(img_rain_4, 0, 0, this.size, this.size);
          } else if (millis() - this.generate_time < 1500) {
            image(img_rain_5, 0, 0, this.size, this.size);
          } else if (millis() - this.generate_time < 1800) {
            image(img_rain_6, 0, 0, this.size, this.size);
          } else if (millis() - this.generate_time < 21000) {
              image(img_rain_7, 0, 0, this.size, this.size);
            } else if (millis() - this.generate_time < 21200) {
              image(img_rain_6, 0, 0, this.size, this.size);
            } else if (millis() - this.generate_time < 21400) {
              image(img_rain_5, 0, 0, this.size, this.size);
            } else if (millis() - this.generate_time < 21600) {
              image(img_rain_4, 0, 0, this.size, this.size);
            } else if (millis() - this.generate_time < 22200) {
              image(img_rain_3, 0, 0, this.size, this.size);
            } else if (millis() - this.generate_time < 22500) {
              image(img_rain_2, 0, 0, this.size, this.size);
            } else if (millis() - this.generate_time < 22800) {
              image(img_rain_1, 0, 0, this.size, this.size);
            }else if (millis() - this.generate_time < 23200) {
              
              push();
              //scale(sca)
              image(img_rain_1, 0, 0, this.size, this.size);
              pop();
            } else {
              this.spot_kind = "blank";
              this.random_kind = 0;
            }
          break;
        case "woodpecker":
          image(img_woodpecker, 0, 0, this.size, this.size);
          break;
        case "coffeeBeans":
          if (millis() - this.generate_time < 12000) {
            image(img_coffee_beans, 0, 0, this.size, this.size);
          } else if (millis() - this.generate_time < 18000) {
            if (frameCount % 30 < 15) {
              image(img_coffee_beans, 0, 0, this.size, this.size);
            }
          } else {
            this.spot_kind = "blank";
            this.random_kind = 0;
          }
          break;
        case "boots":
          let timePassed = millis() - this.generate_time;
          let shouldDisplay = false;
          let displayInterval = 0;

          if (level_cur <4) {
            shouldDisplay =
              timePassed < 4000 || (timePassed < 9000 && frameCount % 30 < 15);
            displayInterval = 9000;
          } else if (level_cur <=9) {
            shouldDisplay =
              timePassed < 1000 || (timePassed < 6000 && frameCount % 30 < 15);
            displayInterval = 6000;
          }

          if (shouldDisplay) {
            image(img_boots, 0, 0, this.size, this.size);
          } else if (timePassed >= displayInterval) {
            this.spot_kind = "blank";
            this.random_kind = 0;
          }
          break;
        case "score2x":
          if (millis() - this.generate_time < 4000) {
            image(img_score2x, 0, 0, this.size, this.size);
          } else if (millis() - this.generate_time < 6000) {
            if (frameCount % 30 < 15) {
              image(img_score2x, 0, 0, this.size, this.size);
            }
          } else {
            this.spot_kind = "blank";
            this.random_kind = 0;
          }
          break;
        case "score05x":
          if (millis() - this.generate_time < 4000) {
            image(img_score05x, 0, 0, this.size, this.size);
          } else if (millis() - this.generate_time < 6000) {
            if (frameCount % 30 < 15) {
              image(img_score05x, 0, 0, this.size, this.size);
            }
          } else {
            this.spot_kind = "blank";
            this.random_kind = 0;
          }
          break;
        case "superUmbrella":
          image(img_super_umbrella, 0, 0, this.size, this.size);
          break;
        default:
          //the all blankspace
          //image(img_water_splash, 0, 0, this.size, this.size);
          break;
      }
    }

    fill(255);
    textSize(10);
    //text(this.random,0,0);
    //text(this.test, -30, 0);
    pop();
  }

  update() {}
}


let level_cur = 1;
let level_timer = 0;

function level_control_in_draw() {
  if (level_timer == 0) {
    level_timer = millis();
  }
  if ((millis() - level_timer) > 8000 && level_cur < 20) {
    level_cur++;
    level_timer = millis();
  }
}

//opptunity control
let opp_frog;
let opp_snail;
let opp_water;
let opp_woodpecker;
let opp_coffeeBeans;
let opp_boots;
let opp_score2x;
let opp_score05x;
let opp_superUmbrella;

let opp_upon_frog;
let opp_upon_snail;
let opp_upon_water;
let opp_upon_woodpecker;
let opp_upon_coffeeBeans;
let opp_upon_boots;
let opp_upon_score2x;
let opp_upon_score05x;
let opp_upon_superUmbrella;
let opp_active_items_total;


//control the opportunity of items in different level
function opp_in_draw() {
  if (level_cur < 3) {
    opp_frog = 5;
    opp_snail = 5;
    opp_water = 5;
    opp_woodpecker = 3;
    opp_coffeeBeans = 5;
    opp_boots = 1;
    opp_score2x = 1;
    opp_score05x = 1;
    opp_superUmbrella = 1;
  } else if (level_cur < 6) {
    opp_frog = 15;
    opp_snail = 15;
    opp_water = 20;
    opp_woodpecker = 4;
    opp_coffeeBeans = 15;
    opp_boots = 3;
    opp_score2x = 5;
    opp_score05x = 1;
    opp_superUmbrella = 2;
  } else if (level_cur < 9) {
    opp_frog = 15;
    opp_snail = 15;
    opp_water = 35;
    opp_woodpecker = 10;
    opp_coffeeBeans = 10;
    opp_boots = 8;
    opp_score2x = 10;
    opp_score05x = 5;
    opp_superUmbrella = 3;
  } else if (level_cur <= 20) {
    opp_frog = 15;
    opp_snail = 15;
    opp_water = 45;
    opp_woodpecker = 8;
    opp_coffeeBeans = 1;
    opp_boots = 6;
    opp_score2x = 12;
    opp_score05x = 10;
    opp_superUmbrella = 2;
  }
  opp_upon_frog = opp_frog;
  opp_upon_snail = opp_upon_frog + opp_snail;
  opp_upon_water = opp_upon_snail + opp_water;
  opp_upon_woodpecker = opp_upon_water + opp_woodpecker;
  opp_upon_coffeeBeans = opp_upon_woodpecker + opp_coffeeBeans;
  opp_upon_boots = opp_upon_coffeeBeans + opp_boots;
  opp_upon_score2x = opp_upon_boots + opp_score2x;
  opp_upon_score05x = opp_upon_score2x + opp_score05x;
  opp_upon_superUmbrella = opp_upon_score05x + opp_superUmbrella;
  opp_active_items_total = opp_upon_superUmbrella+30;
}

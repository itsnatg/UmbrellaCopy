//power up items

//super rain boots
//"boots"

//super umbrella
//"superUmbrella"

//super score
//"score2x"

//bad coffee beans
//"coffeeBeans"

//half score
//"score05x"

let cur_pw_items = [];
let pw_item_display_1, pw_item_display_2, pw_item_display_3;

let pw_item_boots_add_time = 0;
let pw_item_boots_startAngle = 0;
let pw_item_boots_endAngle = 360;
let pw_item_boots_countdown = 0;

let cur_holding_boots = 0;

let pw_item_superUmbrella_add_time = 0;
let pw_item_superUmbrella_startAngle = 0;
let pw_item_superUmbrella_endAngle = 360;
let pw_item_superUmbrella_countdown = 0;
let pw_item_superUmbrella_activate = false;

let pw_item_score05x_add_time = 0;
let pw_item_score05x_startAngle = 0;
let pw_item_score05x_endAngle = 360;
let pw_item_score05x_countdown = 0;
let pw_item_score05x_activate = false;

let pw_item_score2x_add_time = 0;
let pw_item_score2x_startAngle = 0;
let pw_item_score2x_endAngle = 360;
let pw_item_score2x_countdown = 0;
let pw_item_score2x_activate = false;

let pw_item_coffeeBeans_add_time = 0;
let pw_item_coffeeBeans_startAngle = 0;
let pw_item_coffeeBeans_endAngle = 360;
let pw_item_coffeeBeans_countdown = 0;

function show_power_items() {
  let pw_item_countdown_arc = color(164, 29, 242, 180);
  let x_pos = 700;
  let y_pos = 900;
  let img_size = 140;
  let img_gap = 30;

  //pw_item_display_1
  pw_item_display_1 = cur_pw_items[0];
  let img_icon_diplay_1;
  let pw_item_display_1_startAngle;
  let pw_item_display_1_endAngle;
  let pw_item_display_1_countdown;
  switch (pw_item_display_1) {
    case "boots":
      img_icon_diplay_1 = img_boots;
      pw_item_display_1_startAngle = pw_item_boots_startAngle;
      pw_item_display_1_endAngle = pw_item_boots_endAngle;
      pw_item_display_1_countdown = pw_item_boots_countdown;
      break;
    case "superUmbrella":
      img_icon_diplay_1 = img_super_umbrella;
      pw_item_display_1_startAngle = pw_item_superUmbrella_startAngle;
      pw_item_display_1_endAngle = pw_item_superUmbrella_endAngle;
      pw_item_display_1_countdown = pw_item_superUmbrella_countdown;
      break;
    case "score2x":
      img_icon_diplay_1 = img_score2x;
      pw_item_display_1_startAngle = pw_item_score2x_startAngle;
      pw_item_display_1_endAngle = pw_item_score2x_endAngle;
      pw_item_display_1_countdown = pw_item_score2x_countdown;
      break;
    case "coffeeBeans":
      img_icon_diplay_1 = img_coffee_beans;
      pw_item_display_1_startAngle = pw_item_coffeeBeans_startAngle;
      pw_item_display_1_endAngle = pw_item_coffeeBeans_endAngle;
      pw_item_display_1_countdown = pw_item_coffeeBeans_countdown;
      break;
    case "score05x":
      img_icon_diplay_1 = img_score05x;
      pw_item_display_1_startAngle = pw_item_score05x_startAngle;
      pw_item_display_1_endAngle = pw_item_score05x_endAngle;
      pw_item_display_1_countdown = pw_item_score05x_countdown;
      break;
  }

  if (pw_item_display_1) {
    push();
    fill(164, 29, 242);
    //ellipse(x_pos, y_pos, img_size);

    fill(color(pw_item_countdown_arc));
    noStroke();
    arc(
      x_pos,
      y_pos,
      img_size,
      img_size,
      pw_item_display_1_startAngle,
      pw_item_display_1_endAngle
    );

    if (pw_item_display_1_countdown > 2000) {
      image(img_icon_diplay_1, x_pos, y_pos, img_size, img_size);
    } else {
      if (frameCount % 30 < 15) {
        image(img_icon_diplay_1, x_pos, y_pos, img_size, img_size);
      }
    }

    fill(255);
    textSize(30);
    text((pw_item_display_1_countdown / 1000).toFixed(1), x_pos, y_pos);
    pop();
  }
  //pw_item_display_1 end

  //pw_item_display_2
  pw_item_display_2 = cur_pw_items[1];
  let img_icon_diplay_2;
  let pw_item_display_2_startAngle;
  let pw_item_display_2_endAngle;
  let pw_item_display_2_countdown;
  switch (pw_item_display_2) {
    case "boots":
      img_icon_diplay_2 = img_boots;
      pw_item_display_2_startAngle = pw_item_boots_startAngle;
      pw_item_display_2_endAngle = pw_item_boots_endAngle;
      pw_item_display_2_countdown = pw_item_boots_countdown;

      break;
    case "superUmbrella":
      img_icon_diplay_2 = img_super_umbrella;
      pw_item_display_2_startAngle = pw_item_superUmbrella_startAngle;
      pw_item_display_2_endAngle = pw_item_superUmbrella_endAngle;
      pw_item_display_2_countdown = pw_item_superUmbrella_countdown;
      break;
    case "score2x":
      img_icon_diplay_2 = img_score2x;
      pw_item_display_2_startAngle = pw_item_score2x_startAngle;
      pw_item_display_2_endAngle = pw_item_score2x_endAngle;
      pw_item_display_2_countdown = pw_item_score2x_countdown;
      break;
    case "coffeeBeans":
      img_icon_diplay_2 = img_coffee_beans;
      pw_item_display_2_startAngle = pw_item_coffeeBeans_startAngle;
      pw_item_display_2_endAngle = pw_item_coffeeBeans_endAngle;
      pw_item_display_2_countdown = pw_item_coffeeBeans_countdown;
      break;
    case "score05x":
      img_icon_diplay_2 = img_score05x;
      pw_item_display_2_startAngle = pw_item_score05x_startAngle;
      pw_item_display_2_endAngle = pw_item_score05x_endAngle;
      pw_item_display_2_countdown = pw_item_score05x_countdown;
      break;
  }

  if (pw_item_display_2) {
    push();
    fill(color(pw_item_countdown_arc));
    arc(
      x_pos + img_size + img_gap,
      y_pos,
      img_size,
      img_size,
      pw_item_display_2_startAngle,
      pw_item_display_2_endAngle
    );
    if (pw_item_display_2_countdown > 2000) {
      image(
        img_icon_diplay_2,
        x_pos + img_size + img_gap,
        y_pos,
        img_size,
        img_size
      );
    } else {
      if (frameCount % 30 < 15) {
        image(
          img_icon_diplay_2,
          x_pos + img_size + img_gap,
          y_pos,
          img_size,
          img_size
        );
      }
    }
    fill(255);
    textSize(30);
    text(
      (pw_item_display_2_countdown / 1000).toFixed(1),
      x_pos + img_size + img_gap,
      y_pos
    );
    pop();
  }
  //pw_item_display_2 end

  //pw_item_display_3
  pw_item_display_3 = cur_pw_items[2];
  let img_icon_diplay_3;
  let pw_item_display_3_startAngle;
  let pw_item_display_3_endAngle;
  let pw_item_display_3_countdown;
  switch (pw_item_display_3) {
    case "boots":
      img_icon_diplay_3 = img_boots;
      pw_item_display_3_startAngle = pw_item_boots_startAngle;
      pw_item_display_3_endAngle = pw_item_boots_endAngle;
      pw_item_display_3_countdown = pw_item_boots_countdown;

      break;
    case "superUmbrella":
      img_icon_diplay_3 = img_super_umbrella;
      pw_item_display_3_startAngle = pw_item_superUmbrella_startAngle;
      pw_item_display_3_endAngle = pw_item_superUmbrella_endAngle;
      pw_item_display_3_countdown = pw_item_superUmbrella_countdown;
      break;
    case "score2x":
      img_icon_diplay_3 = img_score2x;
      pw_item_display_3_startAngle = pw_item_score2x_startAngle;
      pw_item_display_3_endAngle = pw_item_score2x_endAngle;
      pw_item_display_3_countdown = pw_item_score2x_countdown;
      break;
    case "coffeeBeans":
      img_icon_diplay_3 = img_coffee_beans;
      pw_item_display_3_startAngle = pw_item_coffeeBeans_startAngle;
      pw_item_display_3_endAngle = pw_item_coffeeBeans_endAngle;
      pw_item_display_3_countdown = pw_item_coffeeBeans_countdown;
      break;
    case "score05x":
      img_icon_diplay_3 = img_score05x;
      pw_item_display_3_startAngle = pw_item_score05x_startAngle;
      pw_item_display_3_endAngle = pw_item_score05x_endAngle;
      pw_item_display_3_countdown = pw_item_score05x_countdown;
      break;
  }

  if (pw_item_display_3) {
    push();
    fill(color(pw_item_countdown_arc));
    arc(
      x_pos + 2 * (img_size + img_gap),
      y_pos,
      img_size,
      img_size,
      pw_item_display_3_startAngle,
      pw_item_display_3_endAngle
    );
    if (pw_item_display_3_countdown > 2000) {
      image(
        img_icon_diplay_1,
        x_pos + 2 * (img_size + img_gap),
        y_pos,
        img_size,
        img_size
      );
    } else {
      if (frameCount % 30 < 15) {
        image(
          img_icon_diplay_1,
          x_pos + 2 * (img_size + img_gap),
          y_pos,
          img_size,
          img_size
        );
      }
    }
    fill(255);
    textSize(30);
    text(
      (pw_item_display_3_countdown / 1000).toFixed(1),
      x_pos + 2 * (img_size + img_gap),
      y_pos
    );
    pop();
  }
  //pw_item_display_3 end

  //pw_item_display_4
  pw_item_display_4 = cur_pw_items[3];
  let img_icon_diplay_4;
  let pw_item_display_4_startAngle;
  let pw_item_display_4_endAngle;
  let pw_item_display_4_countdown;
  switch (pw_item_display_4) {
    case "boots":
      img_icon_diplay_4 = img_boots;
      pw_item_display_4_startAngle = pw_item_boots_startAngle;
      pw_item_display_4_endAngle = pw_item_boots_endAngle;
      pw_item_display_4_countdown = pw_item_boots_countdown;

      break;
    case "superUmbrella":
      img_icon_diplay_4 = img_super_umbrella;
      pw_item_display_4_startAngle = pw_item_superUmbrella_startAngle;
      pw_item_display_4_endAngle = pw_item_superUmbrella_endAngle;
      pw_item_display_4_countdown = pw_item_superUmbrella_countdown;
      break;
    case "score2x":
      img_icon_diplay_4 = img_score2x;
      pw_item_display_4_startAngle = pw_item_score2x_startAngle;
      pw_item_display_4_endAngle = pw_item_score2x_endAngle;
      pw_item_display_4_countdown = pw_item_score2x_countdown;
      break;
    case "coffeeBeans":
      img_icon_diplay_4 = img_coffee_beans;
      pw_item_display_4_startAngle = pw_item_coffeeBeans_startAngle;
      pw_item_display_4_endAngle = pw_item_coffeeBeans_endAngle;
      pw_item_display_4_countdown = pw_item_coffeeBeans_countdown;
      break;
    case "score05x":
      img_icon_diplay_4 = img_score05x;
      pw_item_display_4_startAngle = pw_item_score05x_startAngle;
      pw_item_display_4_endAngle = pw_item_score05x_endAngle;
      pw_item_display_4_countdown = pw_item_score05x_countdown;
      break;
  }

  if (pw_item_display_4) {
    image(
      img_icon_diplay_4,
      x_pos + 3 * (img_size + img_gap),
      y_pos,
      img_size,
      img_size
    );
    push();
    fill(color(pw_item_countdown_arc));
    arc(
      x_pos + 3 * (img_size + img_gap),
      y_pos,
      img_size,
      img_size,
      pw_item_display_4_startAngle,
      pw_item_display_4_endAngle
    );

    fill(255);
    textSize(30);
    text(
      (pw_item_display_4_countdown / 1000).toFixed(1),
      x_pos + 3 * (img_size + img_gap),
      y_pos
    );
    pop();
  }
  //pw_item_display_4 end

  //boots countdwon
  if (cur_pw_items.indexOf("boots") >= 0) {
    //console.log("boots is on!");
    pw_item_boots_countdown = 5000 - (millis() - pw_item_boots_add_time);
    let degreePerMillisecond = 360 / 5000;
    pw_item_boots_endAngle =
      pw_item_boots_startAngle + pw_item_boots_countdown * degreePerMillisecond;
  }
  //delete boots when count to 0
  if (pw_item_boots_add_time > 0 && millis() - pw_item_boots_add_time >= 5000) {
    cur_pw_items.splice(cur_pw_items.indexOf("boots"), 1);
    //console.log("boots is off!");
    pw_item_boots_add_time = 0;
  }
  //boots end

  //superUmbrella countdwon
  if (cur_pw_items.indexOf("superUmbrella") >= 0) {
    //console.log("superUmbrella is on!");
    pw_item_superUmbrella_countdown =
      5000 - (millis() - pw_item_superUmbrella_add_time);
    let degreePerMillisecond = 360 / 5000;
    pw_item_superUmbrella_endAngle =
      pw_item_superUmbrella_startAngle +
      pw_item_superUmbrella_countdown * degreePerMillisecond;
    pw_item_superUmbrella_activate = true;
    umbrella_light = int(map(pw_item_superUmbrella_countdown, 0, 5000, 0, 12));
  } else {
    umbrella_light = 0;
  }
  //delete superUmbrella when count to 0
  if (
    pw_item_superUmbrella_add_time > 0 &&
    millis() - pw_item_superUmbrella_add_time >= 5000
  ) {
    cur_pw_items.splice(cur_pw_items.indexOf("superUmbrella"), 1);
    //console.log("superUmbrella is off!");
    pw_item_superUmbrella_add_time = 0;
    pw_item_superUmbrella_activate = false;
  }
  //superUmbrella end

  //score2x countdwon

  if (cur_pw_items.indexOf("score2x") >= 0) {
    //console.log("score2x is on!");
    pw_item_score2x_countdown = 5000 - (millis() - pw_item_score2x_add_time);
    let degreePerMillisecond = 360 / 5000;
    pw_item_score2x_endAngle =
      pw_item_score2x_startAngle +
      pw_item_score2x_countdown * degreePerMillisecond;
    pw_item_score2x_activate = true;
    score_2x_light = int(map(pw_item_score2x_countdown, 0, 5000, 0, 12));
  } else {
    score_2x_light = 0;
  }
  //delete score2x when count to 0
  if (
    pw_item_score2x_add_time > 0 &&
    millis() - pw_item_score2x_add_time >= 5000
  ) {
    cur_pw_items.splice(cur_pw_items.indexOf("score2x"), 1);
    //console.log("score2x is off!");
    pw_item_score2x_add_time = 0;
    pw_item_score2x_activate = false;
  }
  //score2x end

  //coffeeBeans countdwon
  if (cur_pw_items.indexOf("coffeeBeans") >= 0) {
    //console.log("coffeeBeans is on!");
    pw_item_coffeeBeans_countdown =
      3000 - (millis() - pw_item_coffeeBeans_add_time);
    let degreePerMillisecond = 360 / 3000;
    pw_item_coffeeBeans_endAngle =
      pw_item_coffeeBeans_startAngle +
      pw_item_coffeeBeans_countdown * degreePerMillisecond;
    coffeebeans_light = int(map(pw_item_coffeeBeans_countdown, 0, 3000, 0, 12));
  } else {
    coffeebeans_light = 0;
  }
  //delete coffeeBeans when count to 0
  if (
    pw_item_coffeeBeans_add_time > 0 &&
    millis() - pw_item_coffeeBeans_add_time >= 3000
  ) {
    cur_pw_items.splice(cur_pw_items.indexOf("coffeeBeans"), 1);
    ////console.log("coffeeBeans is off!");
    pw_item_coffeeBeans_add_time = 0;
  }
  //coffeeBeans end

  //score05x countdwon
  if (cur_pw_items.indexOf("score05x") >= 0) {
    ////console.log("score05x is on!");
    pw_item_score05x_countdown = 5000 - (millis() - pw_item_score05x_add_time);
    let degreePerMillisecond = 360 / 5000;
    pw_item_score05x_endAngle =
      pw_item_score05x_startAngle +
      pw_item_score05x_countdown * degreePerMillisecond;
    pw_item_score05x_activate = true;
    score_05x_light = int(map(pw_item_score05x_countdown, 0, 5000, 0, 12));
  } else {
    score_05x_light = 0;
  }
  //delete score05x when count to 0
  if (
    pw_item_score05x_add_time > 0 &&
    millis() - pw_item_score05x_add_time >= 5000
  ) {
    cur_pw_items.splice(cur_pw_items.indexOf("score05x"), 1);
    ////console.log("score05x is off!");
    pw_item_score05x_add_time = 0;
    pw_item_score05x_activate = false;
  }
  //score05x end
}

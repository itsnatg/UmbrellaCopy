let winds = [];
let if_hit_by_wind = false;
let if_wind_is_near = false;

let last_time_hit_by_wind = 0;
class Wind {
  constructor(pos) {
    this.random_side = random(100)
    if (this.random_side < 50) {
      this.side = "R"
      this.x = width;
    } else {
      this.side = "L";
      this.x = -120;
    }
    this.random_pos = pos; 
    
    this.y = this.random_pos * 120 + 220;
    this.size = 240;
    this.killed = false;
  }

  draw() {
    push();
    imageMode(CENTER);
    image(ing_wind, this.x, this.y, this.size, this.size);
    pop();
  }
  update() {
    if (this.side == "R") {
       if (level_cur < 2) {
         this.x -= 2;
       } else if (level_cur < 6) {
         this.x -= 4;
       } else if (level_cur < 10) {
         this.x -= 6;
       } else {
         this.x -= 8;
       }
      if (this.x < -120) {
        this.killed =true
      }
      
    } else {
      if (level_cur < 2) {
        this.x += 2;
      } else if (level_cur < 6) {
        this.x += 4;
      } else if (level_cur < 10) {
        this.x += 6;
      } else {
        this.x += 8;
      }
      if (this.x > width+120) {
        this.killed = true;
      }
    }
     
    if (
      !pw_item_superUmbrella_activate &&
      dist(players[0].x, players[0].y, this.x, this.y) < 100
    ) {
      if_hit_by_wind = true;
    }
    if (dist(players[0].x, players[0].y, this.x, this.y) < 200) {
      if_wind_is_near = true;
      //console.log("wind!")
    }

    if (if_wind_is_near && !s_wind.isPlaying()) {
      s_wind.play();
      if_wind_is_near = false;
    }

  }
}
let wind_pos;
function wind_in_draw() {
  if (level_cur <= 3) {
    if (frameCount % 500 == 0) {
      wind_pos = int(random(6));
      let w = new Wind(wind_pos);
      winds.push(w);
    }
  } else if (level_cur <= 6) {
    if (frameCount % 350 == 0) {
      wind_pos = int(random(6));
      let w = new Wind(wind_pos);
      winds.push(w);
    }
  } else if (level_cur <= 8) {
    if (frameCount % 200 == 0) {
      wind_pos = int(random(6));
      let w = new Wind(wind_pos);
      winds.push(w);
    }
  } else {
    if ((frameCount + 40) % 100 == 0) {
      wind_pos = int(random(6));
      let w = new Wind(wind_pos);
      winds.push(w);
    }
    if (frameCount % 100 == 0) {
      let w = new Wind(wind_pos);
      winds.push(w);
    }
  }
  for (let wind of winds) {
    wind.draw();
    wind.update();
    if (wind.killed) {
      winds.splice(wind, 1);
    }
  }
}

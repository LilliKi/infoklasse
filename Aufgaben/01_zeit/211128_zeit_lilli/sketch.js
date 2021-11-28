//CLOCK LIBRABRY
//Clock Function by Christian Swinehart 

var now = clock()

// numerical values for elements of current time
now.hours // hour in 0–23 'military' time
now.hour  // hour in 1–12 'am/pm' time
now.min   // minute
now.sec   // seconds
now.ms    // milliseconds
now.am    // true for hours 0-11
now.pm    // true for hours 12-23

// numerical values for elements of current date
now.year    // the full 4-digit year
now.month   // month number 1–12
now.moon    // the fullness of the moon 0–1.0
now.day     // the day 1–{28,29,30,31}
now.weekday // the day of the week 1-7
now.season  // the current season 1-4 (starting with spring)

// a string-based representation that can be used as an argument to clockStart
now.timestamp // "2001/12/31 23:45:56"

// values between 0.0 and 1.0 measuring the current time's %-completion of various cycles
now.progress.year
now.progress.season
now.progress.month
now.progress.moon
now.progress.week
now.progress.day
now.progress.halfday
now.progress.hour
now.progress.min
now.progress.sec

// string versions of the date & time (in case you want to print it out)
now.text.time    // "11:45:56 P.M."
now.text.hour    // "11"
now.text.hours   // "23"
now.text.min     // "45"
now.text.sec     // "56"
now.text.ampm    // "P.M."
now.text.date    // "31 Dec 2001"
now.text.year    // "2001"
now.text.season  // "Winter"
now.text.month   // "December"
now.text.mon     // "Dec"
now.text.day     // "31"
now.text.weekday // "Monday"



// Code  ––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––

// let moKreise = []; // Monatskreise Array

function setup() {
  createCanvas(800, 800);
  stroke(255);  
  // // create Monatskreise Objects
  // for (let i = 0; i < 11; i++) {
  //   moKreise.push(new Mokreis());
  // }
}

function draw() {
  var now = clock()

  background('black');
  var s = now.sec
  var m = now.min
  var h = now.hours
  var mo = now.month
  
  var r = map(s, 0,59, 0,199)

// for (let i = 0; i < moKreise.length; i++) {
//   // moKreise[i].move();
//   moKreise[i].diaplay();
// }

// Stunden (Farbe), Minuten (Zackenanzahl), Sekunden (Zackenlänge)

colorMode(HSB, height, height, height);
fill(h*30,height, height);
noStroke();
star(400, 400, 2*r, 400, m);

// Minute 0

colorMode(HSB, height, height, height);
fill(h*30,height, height);
noStroke();
circle(400, 400, 3*r);

// Minute 1

var winkel = map(s,0,59,0,PI/4)
var xDreieckL = 400-1.5*r*cos(winkel)
var xDreieckR = 400+1.5*r*cos(winkel)
var yDreieck = 400-1.5*r*sin(winkel)


if(m==1){
  colorMode(HSB, height, height, height);
  fill(h*30,height, height);
  noStroke();
  triangle(400,0,xDreieckL,yDreieck,xDreieckR,yDreieck);
}

// // Monat+Tage 

colorMode(RGB,255,255,255,255);
let monthfill = map(now.day,0,31,0,255)

// // Variante 1: Striche + 1 Kreis

// fill('white');
// stroke('black');
// star(400, 400, 0, r*1.5, mo);

// fill(monthfill);
// noStroke();
// if(3*r>200) {
// circle(400,400,100);
// } else {
//   circle(400,400,1.5*r)
// };

// // innerer schwarzer Kreis

// stroke('black');
// noFill();
// circle(400, 400, 3*r);

// Variante 2: Kreise

var mWinkel = map(mo,0,12,0,2*PI)
var xMonat = 400+r*sin(mWinkel)
var yMonat = 400-r*cos(mWinkel)

fill(monthfill);
noStroke();
circle(xMonat,yMonat,r/3);

// 12 leere Kreise (klappt noch nicht)

// for (var i = 0; i < 11; i++) {

//   var alleMo = [1,2,3,4,5,6,7,8,9,10,11,12]
//   var alleWinkel = [2*PI/12*alleMo[i]]
//   var xAlleMo = 400+r*sin(alleWinkel)
//   var yAlleMo = 400-r*cos(alleWinkel)

//   noFill();
//   stroke(255);
//   circle(xAlleMo[i],yAlleMo[i],r/3);
// }

// voller Kreis als Test (2 --> Februar)

for (var i = 0; i < 11; i++) {

  var alleMo = 2
  var alleWinkel = 2*PI/12*alleMo
  var xAlleMo = 400+r*sin(alleWinkel)
  var yAlleMo = 400-r*cos(alleWinkel)

  noFill();
  stroke(255);
  circle(xAlleMo,yAlleMo,r/3);
}

// Zeit & Datum als Text –––––––––––––––––––––––––––––––––––––––

textSize(15);
noStroke();
fill('white');
text(h + "  " + m + "  " + s, 10, 20);

textSize(15);
fill('white');
text(now.text.date, 700, 20);

}

// Stern-Funktion aus p5.js –––––––––––––––––––––––––––––––––––––––

function star(x, y, radius1, radius2, npoints) {
  let angle = TWO_PI / npoints;
  let halfAngle = angle / 2.0;
  beginShape();
  for (let a = 0; a < TWO_PI; a += angle) {
    let sx = x + cos(a) * radius2;
    let sy = y + sin(a) * radius2;
    vertex(sx, sy);
    sx = x + cos(a + halfAngle) * radius1;
    sy = y + sin(a + halfAngle) * radius1;
    vertex(sx, sy);
  }
  endShape(CLOSE);
}

// Mokreis class –––––––––––––––––––––––––––––––––––––––



// class Mokreis {
//   constructor() {
//     this.x = random(width);
//     this.y = random(height);
//     this.r = 20;
//   }

//     display() {
//       noFill();
//       stroke(255);
//       circle(this.x, this.y, this.r);
    
//   }
// }


let sInsectKey;
let lInsectKey;
let sInsects = [];
let lInsects = [];
let insectNumsY = 600;
let skalaY = 680;
let data;
let years;
let year;
let smallI;
let largeI;

function preload() {
  data = loadTable('Insekten_viz.csv', 'csv', 'header');
}

function setup() {
  createCanvas(1050, 750);

  years = 0; // muss variabel sein --> abhängig von angeklickter jahreszahl
  year = data.getNum(years, 1);
  smallI = data.getNum(years, 2);
  largeI = data.getNum(years, 3);

  sInsectKey = new Insect(50, insectNumsY, color);
  lInsectKey = new Insect(525, insectNumsY, color);

  for (let i = 0; i < smallI; i++) {
    sInsects[i] = new Insect(random(50, 1000), random(120, 540), color);
  }

  for (let i = 0; i < largeI; i++) {
    lInsects[i] = new Insect(random(50, 1000), random(120, 540), color);
  }
}

function draw() {
  background('black');

  // Vizualisation ––––––––––––––––––––––––––––––––––––––

  // Title
  fill(206);
  textSize(40);
  textAlign('left');
  text("How many Insects on the Windshield?", 50, 80);


  // große Jahreszahl
  fill(206);
  textAlign('center');
  textSize(300);
  text(year, 525, 430);

  // Large Insects 1997
  for (let i = 0; i < largeI; i++) {
    lInsects[i].large();
  }

  // Small Insects 1997
  for (let i = 0; i < smallI; i++) {
    sInsects[i].small();
  }


  // Key –––––––––––––––––––––––––––––––––––––––––––––––––

  // Insects (Key)
  sInsectKey.small();
  lInsectKey.large();

  // Numbers
  fill(0, 144, 124);
  textSize(40);
  textAlign(LEFT);
  text(smallI + " small insects", 80, insectNumsY + 15);

  fill(158, 5, 255);
  text(largeI + " large insects", 555, insectNumsY + 15);

  // Skala –––––––––––––––––––––––––––––––––––––––––––––––

  let abstand = map(1, 0, data.getRowCount() - 1, 0, 880);

  // Regler
  fill(206);

  if (mouseX > 100 && mouseX < 960 && mouseIsPressed) {
    rect(mouseX - 20, skalaY - 20, 40, 40, 5);
  } else if (mouseX >= 960 && mouseIsPressed) {
    rect(960, skalaY - 20, 40, 40, 5);
  } else {
    rect(80, skalaY - 20, 40, 40, 5);
  }

  // Years
  for (let i = 0; i < data.getRowCount(); i++) {
    let yearScale = data.getNum(i, 1)
    fill(70);
    textAlign('center');
    textSize(15);
    text(yearScale, 100 + i * abstand, skalaY + 5);
  }

  // Playbutton
  fill(206);
  noStroke();
  triangle(50, skalaY - 12, 70, skalaY, 50, skalaY + 12);

}
// Classes =============================================

class Insect {
  constructor(x, y, color) {
    this.x = x;
    this.y = y;
    this.cs = color(0, 144, 124);
    this.cl = color(158, 5, 255)
  }

  small() {
    noStroke();
    fill(this.cs);
    circle(this.x, this.y, 10);
  }

  large() {
    noStroke();
    fill(this.cl);
    circle(this.x, this.y, 20);
  }
}





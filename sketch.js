const numberOfObjects = 750;
let objects = [];
let icosphere;
const colors = ["#60734D", "#91A672", "#C7D9A0", "#F2B705", "#BF9004"];

function preload() {
  icosphere = loadModel('icosphere.obj', true);
}

function setup() {

  createCanvas(800, 800, WEBGL);

  noStroke();
  fill(245);

  let center = createVector(0, 0, 0);

  // set circle colors
  let colorChangeInterval = floor(numberOfObjects / colors.length);
  let colorChangeIndex = 0;

  for (let i = 0; i < numberOfObjects; i++) 
  {
    let p = createVector(random(-width , width), random(-height, height), random(-width, width)) 
    let d = center.dist(p);
    let s = 1 - d / width;

    if (s <= 0) {
      s = 0.01;
    }
    
    let colorIndex = floor(map(d, 0, width * 2, 0, colors.length));
    let colorIndexNext = colorIndex + 1;

    let circleColor = color(colors[colorIndex]);
    let circleColorNext = color(0)
    if (colorIndexNext < colors.length) {
        circleColorNext = color(colors[colorIndexNext])
    }

    floor(map(i, -width , width, 0, colors.length));
    circleColor = lerpColor(circleColor, circleColorNext, d / width)

    objects[i] = {
      position: p,
      size: s,
      color: circleColor
    }     

    colorChangeIndex++

    if (colorChangeIndex >= colorChangeInterval) {
        colorChangeIndex = 0;
    }
  }
}

function draw() {  
  background(10);

  ambientLight(100);
  directionalLight(255, 255, 255, 0, 0, -1);
  lightFalloff(1, 0, 0);
  ambientMaterial(250);

  for (let i = 0; i < numberOfObjects; i++) 
  {
    push();
    translate(objects[i].position.x, objects[i].position.y, objects[i].position.z);
    fill(objects[i].color);
    scale(objects[i].size);
    model(icosphere);
    pop();
  }

  orbitControl();
}

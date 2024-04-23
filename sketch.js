let entropy = [];
let entropyUsed = [];
let zudoku = [];
let xSmal = 0;
let ySmall = 0;
let xMedium = 0;
let yMedium = 0;
let xBig = 0;
let yBig = 0;

function setup() {
  createCanvas(1080, 1080);
  colorMode(HSB);
  textAlign(CENTER, CENTER);
    // initialize 27x27mat with 0 in each cell
  for (let i = 0; i < 27; i++) {
    entropy[i] = new Array(27);
    entropyUsed[i] = new Array(27);
    for (let j = 0; j < 27; j++) {
      entropy[i][j] = 0;
      entropyUsed[i][j] = 0;
    }
  }
  // initizalize 9x9mat Zudoku with -1
  for (let i = 0; i < 9; i++) {
    zudoku[i] = new Array(9);
    for (let j = 0; j < 9; j++) {
      zudoku[i][j] = -1;
    }
  }
  // initialize 27x27mat with 1-9 numbers
  for (let i = 0; i < 27; i+=3) {
    for (let j = 0; j < 27; j+=3) {
      let cont = 0;
      for (let k = 0; k < 3; k++) {
        for (let l = 0; l < 3; l++) {
          entropy[i+k][j+l] = cont;
          cont++;
        }
      }
    }
  }
}

function mousePressed() {
  getCoordinates(); 
  /*
  console.log("Mouse\tX: "+ mouseX + "\tY: " + mouseY);
  console.log("Small\tX: " + xSmall + "\tY:" + ySmall);
  console.log("Medium\tX: " + xMedium + "\tY:" + yMedium);
  console.log("Big\tX: " + xBig + "\tY:" + yBig);
  */
  numberSelected = (entropy[xSmall][ySmall]);
  if (entropyUsed[xSmall][ySmall] == 0) {
    updateEntropy(xSmall, ySmall, numberSelected);
    zudoku[xMedium][yMedium] = numberSelected;
  }
  drawBackgroundColor();
  drawMainGrid();   
  showEntropy(); 
  showZudoku();  
  drawMainGrid();
}

function draw() {
  drawBackgroundColor();
  drawMainGrid();
  showEntropy();
  noLoop();
}

///////////////////////////////////////////////////////////////////////////

function drawMainGrid () {
  for (let i=0; i<27; i++) {
      if (i % 9 == 0){
          strokeWeight(7);
      } else if (i % 3 == 0 ) {
          strokeWeight(3);
      } else {
          strokeWeight(0.5);
      }
      line (0, height/27*i, width, height/27*i); // Horizontal lines
      line (width/27*i, 0, width/27*i, height);  // Vertical lines
  }
  for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
          if (zudoku[i][j] != "-1") {
              fill(0, 0, 100);
              rect (width/9*i, height/9*j, width/9, height/9);
              textSize(100);
              fill(0, 0, 0);
              text(zudoku[i][j], width/9*i + 60, height/9*j + 75)
          }
      }
  }  
  for (let i=0; i<3; i++) {
      strokeWeight(7);
      line (0, height/3*i, width, height/3*i); // Horizontal lines
      line (width/3*i, 0, width/3*i, height);  // Vertical lines
  }
}
function drawBackgroundColor () {
      for (let i = 0; i < 27; i+=3) {
      for (let j = 0; j < 27; j+=3) {
          let cont = 0;
          for (let k = 0; k < 3; k++) {
              for (let l = 0; l < 3; l++) {      
                  cont += entropyUsed[i+k][j+l];    
              }
          }
          strokeWeight(0.5);
          let colorH = map(cont, 0, 7, 0, 300);
          let colorS = map(cont, 0, 7, 50, 100);
          let colorB = map(cont, 0, 7, 50, 500);
          if (cont == 8) {
              colorH = 0;
              colorS = 0;
              colorB = 100;
          }
          fill(colorH, colorS, colorB);
          rect(width/9*(i/3),height/9*(j/3), width/9);
      }
  }
}
function getCoordinates () {
  for (let i = 0; i<width; i++){
      if (mouseX >= width/27*i && mouseX < width/27*(i+1)) {
          xSmall = i;
      }
      if (mouseY >= height/27*i && mouseY < height/27*(i+1)) {
           ySmall = i;
      }

      if (mouseX >= width/9*i && mouseX < width/9*(i+1)) {
          xMedium = i;
      }
      if (mouseY >= height/9*i && mouseY < height/9*(i+1)) {
          yMedium = i;
      }
      if (mouseX >= width/3*i && mouseX < width/3*(i+1)) {
          xBig = i;
        }
        if (mouseY >= height/3*i && mouseY < height/3*(i+1)) {
          yBig = i;
      }

  }
}
function showEntropy(){
  for (let i = 0; i < 27; i++) {
      for (let j = 0; j < 27; j++) {
          textSize(20);
          if (entropy[i][j] == ".") {  
              fill(0, 0, 0);
              text(entropy[i][j], width/27*i+10, height/27*j+27);
              fill(0, 0, 50);
              strokeWeight(0.5);
              rect (width/27*i, height/27*j, width/27, height/27);
          } else 
          {
              fill(0, 0, 10);
              text(entropy[i][j], width/27*i+10, height/27*j+27);
          }
      }
    }
}
function showZudoku (){
  for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
          if (zudoku[i][j] != "-1") {
              strokeWeight(5);
              rect (width/9*i, height/9*j, width/9, height/9);
              textSize(100);
              textAlign(CENTER, CENTER);
              text(zudoku[i][j], width/9*i + 60, height/9*j + 60)
          }
      }
  } 
}
function updateEntropy(x, y, num) {
  for (let i = 0; i < 27; i++) {

      // delete columns and raws 
      if (entropyUsed[x][i] == 0) {
          if (entropy[x][i] == num) {
              entropy[x][i] = "."; //columns
              entropyUsed[x][i] = 1;
             
          }
      } 
      if (entropyUsed[i][y] == 0) {
          if (entropy[i][y] == num) {
              entropy[i][y] = "."; //raws
              entropyUsed[i][y] = 1;
             
          }
      } 
      //delete one of the 9x9 squares
      for (let a = 0; a < 27; a+=9) {
          for (let b = 0; b < 27; b+=9) {
              if (x>=a && x < (a+9) && y >= b && y < (b+9)) {
                  for (let j = a; j < (a+9); j++) {
                      for (let k = b; k < (b+9); k++){
                          if (entropy[j][k] == num) {
                              entropy[j][k] = ".";
                              entropyUsed[j][k] = 1;
                          }
                      }
                  }
              }
          }
      }
      //delete one of the 3x3 squares
      for (let a = 0; a < 27; a+=3) {
          for (let b = 0; b < 27; b+=3) {
              if (x>=a && x<(a+3) && y>=b && y<(b+3)) {
                  //console.log("a:" + a + "\tb:" + b);
                  for (let j = a; j < (a+3); j++) {
                      for (let k = b; k < (b+3); k++){
                          if (entropy[j][k] != num)
                              entropy[j][k] = num;
                              entropyUsed[j][k] = 1;
                      }
                  }
              }
          } 
      }
  }
}
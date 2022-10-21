const game = {
  currentTool: "axe",
};
const grid = document.querySelector("#game-board");
// var trunkLen;

/*
*
// --------help functions - tested!
*
*/

const randomNumAtoB = (a, b) => {
  return a + Math.floor(Math.random() * (b + 1 - a));
};

const generateDivIDs = () => {
  for (let i = 0; i < 20; i++) {
    for (let j = 0; j < 30; j++) {
      let newDiv = document.createElement("div");
      newDiv.setAttribute("id", `(${j},${i})`);
      grid.appendChild(newDiv);
    }
  }
};

const getElementByIdF = (x, y) => {
  return document.getElementById(`(${x},${y})`);
};

const generateSoil = () => {
  soilY = randomNumAtoB(13, 18);
  for (let i = 0; i < 20 - soilY; i++) {
    for (let j = 0; j < 30; j++) {
      let newDiv = getElementByIdF(0 + j, soilY + i);
      if (newDiv) {
        newDiv.classList.add("soil");
      }
    }
  }
  return soilY;
};

const drawTopSoil = (soilY) => {
  let topSoil = getElementByIdF(0, soilY - 1);
  if (topSoil) {
    topSoil.classList.add("top-soil");
    for (let i = 0; i <= 29; i++) {
      topSoil = getElementByIdF(i, soilY - 1);
      topSoil.classList.add("top-soil");
    }
  }
};

function drawTreeTrunck(soilY) {
  trunkLen = randomNumAtoB(2, 4);
  let x = randomNumAtoB(6, 24);
  let treeTrunk = getElementByIdF(x, soilY - 2);
  if (treeTrunk) {
    treeTrunk.classList.add("red");
    for (let i = 1; i < trunkLen; i++) {
      soilY--;
      treeTrunk = getElementByIdF(x, soilY - 2);
      treeTrunk.classList.add("red");
    }
  }
  return trunkLen;
}
function drawTreeLeaves(trunkLen) {
  let tree = document.getElementsByClassName(`red`)[0];
  let position = tree.id; // (0,13)
  position = position.replace("(", "");
  position = position.replace(")", "");
  let y = Number(position.split(",")[1]);
  let x = Number(position.split(",")[0]);

  counter = 0;
  let greenLength = trunkLen * 2 + 1;
  y--;
  console.log(x, y, trunkLen, tree);
  for (let i = 0; i <= trunkLen; i++) {
    for (let j = 0; j < greenLength; j++) {
      tree = getElementByIdF(x - trunkLen + i + j, y - counter);
      tree.classList.add("green");
    }
    greenLength = greenLength - 2;
    if (counter <= 4) counter++;
  }
  return x;
}
function setStonePosition(treeXposition, soilY) {
  let x, y;
  console.log(treeXposition, soilY);
  if (treeXposition > 15) {
    x = randomNumAtoB(2, 10);
    y = soilY - 2;
  } else {
    x = randomNumAtoB(18, 26);
    y = soilY - 2;
  }
  return `(${x},${y})`;
}

function drawStones(stringPosition) {
  let stone = document.getElementById(stringPosition);
  stone.classList.add("stone");
  stone = stone.id;
  console.log(stone);
  stone = stone.replace("(", "");
  stone = stone.replace(")", "");
  let y = Number(stone.split(",")[1]);
  let x = Number(stone.split(",")[0]);
  console.log(x, y);

  for (let i = 0; i < 2; i++) {
    for (let j = 0; j < 2; j++) {
      stone = getElementByIdF(x + i, y - j);
      stone && console.log("ok");

      stone.classList.add("stone");
    }
  }
}

/*
*
// --------game play
*
*/

function generateWorld() {
  var soilY;
  var trunkLen;
  var treeXposition;
  var stringPosition;
  generateDivIDs();
  soilY = generateSoil();
  drawTopSoil(soilY);
  trunkLen = drawTreeTrunck(soilY);
  treeXposition = drawTreeLeaves(trunkLen);
  stringPosition = setStonePosition(treeXposition, soilY); //`(${x},${y})`
  drawStones(stringPosition);
}

generateWorld();

/*
*
// --------temporary functions
*
*/

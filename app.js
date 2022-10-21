const game = {
  currentTool: "axe",
};
const grid = document.querySelector("#game-board");

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
  let trunkLen = randomNumAtoB(2, 5);
  let x = randomNumAtoB(0, 30);
  let treeTrunk = getElementByIdF(x, soilY - 2);
  if (treeTrunk) {
    treeTrunk.classList.add("red");
    for (let i = 1; i < trunkLen; i++) {
      soilY--;
      treeTrunk = getElementByIdF(x, soilY - 2);
      treeTrunk.classList.add("red");
    }
  }
}

/*
*
// --------hgame play
*
*/

function generateWorld() {
  var soilY;
  generateDivIDs();
  soilY = generateSoil();
  drawTreeTrunck(soilY);
  drawTopSoil(soilY);
}

generateWorld();

/*
*
// --------temporary functions
*
*/

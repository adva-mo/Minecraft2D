const game = {
  currentTool: null,
  gameState: null,
  selected: false,
  darkMood: false,
  inventory: {
    leaves: 0,
    trunk: 0,
    stone: 0,
    soil: 0,
    grass: 0,
  },
  miningOptions: {
    shovel: ["soil", "grass"],
    axe: ["leaves", "trunk"],
    pickaxe: "stone",
  },
};

const grid = document.querySelector("#game-board");

const shovel = document.querySelector("#shovel");
const axe = document.querySelector("#axe");
const pickaxe = document.querySelector("#pickaxe");
const tools = [shovel, axe, pickaxe];

const soil = document.querySelector("#soil-pic");
const leave = document.querySelector("#leaves-pic");
const stone = document.querySelector("#stones-pic");
const trunk = document.querySelector("#trunk-pic");
const miningMaterial = [leave, trunk, stone, soil];

const gameButtons = document.querySelectorAll("button");

/*
*
// -------- functions - tested!
*
*/
function sliceArrIntoChunks(arr, chunkSize) {
  const res = [];
  for (let i = 0; i < arr.length; i += chunkSize) {
    const chunk = arr.slice(i, i + chunkSize);
    res.push(chunk);
  }
  return res;
}
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
    topSoil.classList.add("grass");
    for (let i = 0; i <= 29; i++) {
      topSoil = getElementByIdF(i, soilY - 1);
      topSoil.classList.add("grass");
    }
  }
};

function drawTreeTrunck(soilY) {
  trunkLen = randomNumAtoB(2, 4);
  let x = randomNumAtoB(6, 24);
  let treeTrunk = getElementByIdF(x, soilY - 2);
  if (treeTrunk) {
    treeTrunk.classList.add("trunk");
    for (let i = 1; i < trunkLen; i++) {
      soilY--;
      treeTrunk = getElementByIdF(x, soilY - 2);
      treeTrunk.classList.add("trunk");
    }
  }
  return trunkLen;
}
function drawTreeLeaves(trunkLen) {
  let tree = document.getElementsByClassName(`trunk`)[0];
  let position = tree.id; // (0,13)
  position = position.replace("(", "");
  position = position.replace(")", "");
  let y = Number(position.split(",")[1]);
  let x = Number(position.split(",")[0]);

  counter = 0;
  let greenLength = trunkLen * 2 + 1;
  y--;
  // console.log(x, y, trunkLen, tree);
  for (let i = 0; i <= trunkLen; i++) {
    for (let j = 0; j < greenLength; j++) {
      tree = getElementByIdF(x - trunkLen + i + j, y - counter);
      tree.classList.add("leaves");
    }
    greenLength = greenLength - 2;
    if (counter <= 4) counter++;
  }
  return x;
}
function setStonePosition(treeXposition, soilY) {
  let x, y;
  // console.log(treeXposition, soilY);
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
  stone = stone.replace("(", "");
  stone = stone.replace(")", "");
  let y = Number(stone.split(",")[1]);
  let x = Number(stone.split(",")[0]);
  for (let i = 0; i < 2; i++) {
    for (let j = 0; j < 2; j++) {
      stone = getElementByIdF(x + i, y - j);
      stone.classList.add("stone");
    }
  }
}

function scanWorldToGameState() {
  let gameState = [];
  const gridCells = grid.querySelectorAll("div");
  let allCells = [...gridCells];
  allCells = sliceArrIntoChunks(allCells, 30);
  for (let row of allCells) {
    let newRow = [];
    for (let div of row) {
      newRow.push(div);
    }
    gameState.push(newRow);
  }
  return gameState;
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
  stringPosition = setStonePosition(treeXposition, soilY);
  drawStones(stringPosition);
}

generateWorld();
game.gameState = scanWorldToGameState();

/*
*
// --------temporary functions
*
*/
function toolClick(e) {
  // if (!game.selected) {
  //   e.target.classList.add("selected");
  // }
  // game.selected = true;
  game.currentTool = e.target.id;
  console.log(game.currentTool);
}
function materialClick(e) {
  console.log(e.target.id);
}
function miningClick(e) {
  const ElementClass = e.target.getAttribute("class");

  if (ElementClass) {
    game.inventory[ElementClass] = game.inventory[ElementClass] + 1;
    switch (ElementClass) {
      case "stone":
        e.target.classList.remove(ElementClass);
        break;
      case "leaves":
        e.target.classList.remove(ElementClass);
        break;
      case "soil":
        e.target.classList.remove(ElementClass);
        break;
      case "trunk":
        e.target.classList.remove(ElementClass);
        break;
      case "grass":
        e.target.classList.remove(ElementClass);
        break;
    }
    updateInventry(ElementClass);
  }
  console.log("item add to object", game.inventory);
}

function updateInventry(ElementClass) {
  let something = document.querySelector(`#${ElementClass}-count`);
  something = game.inventory.ElementClass;
}
function buttonClick(e) {
  if (e.target.id == "restart") {
    console.log("restart");
  }
  if (e.target.id == "darkMood") {
    if (!game.darkMood) {
      console.log("dark mood");
      game.darkMood = true;
      grid.classList.add("dark-mood");
      // grid.style.backgroundColor = "blue";
    } else {
      game.darkMood = false;
      grid.classList.remove("dark-mood");
    }
  }
  if (e.target.id == "random") {
    console.log("random");
  }
}

function addClickEvents() {
  const gridCells = grid.querySelectorAll("div");
  gridCells.forEach((cell) => {
    cell.addEventListener("click", miningClick);
    // cell.style.cursor = "pointer";
  });
  tools.forEach((tool) => {
    tool.addEventListener("click", toolClick);
  });
  miningMaterial.forEach((material) => {
    material.addEventListener("click", materialClick);
  });
  gameButtons.forEach((button) => {
    button.addEventListener("click", buttonClick);
  });
}

addClickEvents();

// function addEventsToGridCells(){
//   const allChilds = [...grid.children];

function DashboardClickEvents() {}

function getNumId(stringId) {}

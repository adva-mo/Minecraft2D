const game = {
  currentTool: null,
  gameState: null,
  selected: false,
  readyToPlant: null,
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
    pickaxe: ["stone"],
  },
};

const grid = document.querySelector("#game-board");
const landingPage = document.querySelector("#landing-page");

const shovel = document.querySelector("#shovel");
const axe = document.querySelector("#axe");
const pickaxe = document.querySelector("#pickaxe");
const tools = [shovel, axe, pickaxe];

const soil = document.querySelector("#soil-pic");
const leave = document.querySelector("#leaves-pic");
const stone = document.querySelector("#stone-pic");
const trunk = document.querySelector("#trunk-pic");
const grass = document.querySelector("#grass-pic");
const miningMaterial = [leave, trunk, stone, soil, grass];

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

const drawSoil = () => {
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

const drawGrass = (soilY) => {
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
  let stoneHeight = randomNumAtoB(2, 3);
  stone.classList.add("stone");
  stone = stone.id;
  stone = stone.replace("(", "");
  stone = stone.replace(")", "");
  let y = Number(stone.split(",")[1]);
  let x = Number(stone.split(",")[0]);
  for (let i = 0; i < stoneHeight; i++) {
    for (let j = 0; j < stoneHeight; j++) {
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

function addClickEvents() {
  const gridCells = grid.querySelectorAll("div");
  gridCells.forEach((cell) => {
    cell.addEventListener("click", gridCellClick);
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

function setDarkMood() {
  grid.classList.toggle("dark-mood");
}

// function gridCellClick(e) {
//   const ElementClass = e.target.getAttribute("class");
//   if (game.currentTool) {
//     console.log(`elemnet class: ${ElementClass}`);

//     if (ElementClass) {
//       miningValidation(e, ElementClass);
//     } else {
//       return;
//     }
//   } else if (game.readyToPlant) {
//     plantingValidation(ElementClass); //here!!!!!
//   }
// }

function miningValidation(e, ElementClass) {
  console.log(game.currentTool);
  let options = game.miningOptions[`${game.currentTool}`];
  if (options.includes(`${ElementClass}`)) {
    game.inventory[ElementClass] += 1;
    updateInventry(ElementClass);
    e.target.classList.remove(ElementClass);
  } else {
    console.log(`you can't mine that with ${game.currentTool}!!!`);
  }
}

function updateInventry(ElementClass) {
  let something = document.querySelector(`#${ElementClass}-count`);
  something.innerHTML = game.inventory[`${ElementClass}`];
}

/*
*
// --------game starts here
*
*/

generateRandomWorld();

function generateRandomWorld() {
  var soilY;
  var trunkLen;
  var treeXposition;
  var stringPosition;
  generateDivIDs();
  soilY = drawSoil();
  drawGrass(soilY);
  trunkLen = drawTreeTrunck(soilY);
  treeXposition = drawTreeLeaves(trunkLen);
  stringPosition = setStonePosition(treeXposition, soilY);
  drawStones(stringPosition);
}

game.gameState = scanWorldToGameState();

addClickEvents();

/*
*
// --------temporary functions
*
*/

function toolClick(e) {
  game.currentTool = e.target.id;
  console.log(game.currentTool);
}

function gridCellClick(e) {
  const ElementClass = e.target.getAttribute("class");
  if (game.currentTool) {
    console.log(`elemnet class: ${ElementClass}`);

    if (ElementClass) {
      miningValidation(e, ElementClass);
    } else {
      return;
    }
  } else if (game.readyToPlant) {
    plantingValidation(e, ElementClass); //here!!!!!
  }
}

function materialClick(e) {
  let material = e.target.id;
  material = material.replace("-pic", "");
  // console.log(material);
  if (game.inventory[material] <= 0) {
    console.log("you dont have enough");
  } else {
    console.log("plant item selected" + material);
    game.currentTool = null;
    // game.readyToPlant = true;
    game.readyToPlant = material;
    // plantingValidation(e);
  }
}

function plantingValidation(e) {
  var DivBelowClass;
  // game.readyToPlant = "trunk"
  let plantLocation = e.target.id;
  // console.log("planting location click ", plantLocation); //(6,13)
  DivBelowClass = getdivBelowClass(plantLocation);
  // console.log(DivBelowClass);
  if (DivBelowClass) {
    console.log("plantes sucees");
  } else {
    console.log("cant be on air");
  }
}

function getdivBelowClass(plantLocation) {
  // let divBelow;
  plantLocation = plantLocation.replace("(", "");
  plantLocation = plantLocation.replace(")", "");
  let y = Number(plantLocation.split(",")[1]);
  let x = Number(plantLocation.split(",")[0]);
  DivBelowClass = getElementByIdF(x, y + 1);
  let plantingLoctionClass = DivBelowClass.getAttribute("class");
  console.log("div below class", plantingLoctionClass);
  return plantingLoctionClass;
}

function buttonClick(e) {
  if (e.target.id == "restart") {
    console.log("restart");
  }
  if (e.target.id == "darkMood") {
    setDarkMood(game.darkMood);
  }
  if (e.target.id == "random") {
    console.log("random");
  }
  if (e.target.id == "play") {
    landingPage.classList.add("display-none");
  }
}

function getNumId(stringId) {}

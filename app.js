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
  let x = randomNumAtoB(13, 18);
  for (let i = 0; i < 20 - x; i++) {
    for (let j = 0; j < 30; j++) {
      let newDiv = getElementByIdF(0 + j, x + i);
      if (newDiv) {
        newDiv.classList.add("soil");
      }
    }
  }
  console.log(x);
};
/*
*
// --------hgame play
*
*/

function generateWorld() {
  generateDivIDs();
  generateSoil();
}

generateWorld();
/*
*
// --------temporary functions
*
*/

function getRandomPosition() {
  return 5, 5;
}

function getRandomTree() {
  //   let len = Math.floor(Math.random() * 6);
  return 4;
}
// getRandomTree();
function drawElement(y) {
  let len = randomNumAtoB(2, 5);

  let x = randomNumAtoB(0, 30);
  let tree = document.getElementById(`(${x},${y})`);
  console.log(tree);
  for (let i = 0; i < len; i++) {
    ++x;
    tree = document.getElementById(`(${x},${y})`);
    if (tree) {
      tree.classList.add("red");
    }
  }
}

drawElement(17);

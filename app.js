const grid = document.querySelector("#game-board");

// first.classList.add("red");

for (let i = 0; i <= 20; i++) {
  for (let j = 0; j <= 30; j++) {
    let newDiv = document.createElement("div");
    newDiv.setAttribute("id", `${i},${j}`);
    grid.appendChild(newDiv);
  }
}
let first = document.getElementById("5,5");
// first.classList.add("red");

function getRandomPosition() {
  return 5, 5;
}
function getRandomTree() {
  //   let len = Math.floor(Math.random() * 6);
  return 4;
}
// getRandomTree();
function drawElement(x, y, len) {
  var tree = document.getElementById(`${x},${y}`);
  for (let i = 0; i < len; i++) {
    ++x;
    tree = document.getElementById(`${x},${y}`);
    tree.classList.add("red");
  }
}
drawElement(11, 22, 3);

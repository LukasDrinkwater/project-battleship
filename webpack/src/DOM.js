import { doc } from "prettier";
import { player1, player2, gameController } from "./functions";

const domElements = {
  player1ContainerDOM: document.getElementById("player1-container"),
  player1MissesDOM: document.getElementById("player1-misses"),
  player1GameboardDOM: document.getElementById("player1-gameboard"),
  player1GridSquares: document.getElementsByClassName("player1-grid-square"),

  player2ContainerDOM: document.getElementById("player2-container"),
  player2MissesDOM: document.getElementById("player2-misses"),
  player2GameboardDOM: document.getElementById("player2-gameboard"),
  player2GridSquares: document.getElementsByClassName("player2-grid-square"),

  startGameButton: document.getElementById("start-game-button"),

  addShipButtons: document.getElementsByClassName("add-ship-button"),
};

// from the gameboard do a for loop to create the divs for each set of coordinates
// and for each one assign the data-coordinates property of the div to the coordinates
// that are being made.

function createGameboardDOM(player) {
  // console.log(player1.board.boardArray);

  const playerBoard = player.board.boardArray;

  for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 10; j++) {
      let coordinatesValue = playerBoard[i][j];
      const gridSquare = document.createElement("div");
      gridSquare.classList.add("grid-square");
      gridSquare.setAttribute(
        "data-coordinates",
        coordinatesValue
        // `${coordinatesValue[0]},${coordinatesValue[1]}`
      );

      if (player.playerName === "player1") {
        gridSquare.classList.add(`${player.playerName}-grid-square`);
        gridSquare.setAttribute("data-playerName", player.playerName);
        domElements.player1GameboardDOM.appendChild(gridSquare);
      } else {
        gridSquare.classList.add(`${player.playerName}-grid-square`);
        domElements.player2GameboardDOM.appendChild(gridSquare);
        gridSquare.setAttribute("data-playerName", player.playerName);
      }
    }
  }
  domElements.gridSquares = document.getElementsByClassName("grid-square");
  // if (player.playerName === "player1") {
  //   domElements.player1GridSquares = document.getElementsByClassName(
  //     "player1-grid-square"
  //   );
  // } else {
  //   domElements.player1GridSquares = document.getElementsByClassName(
  //     "player2-grid-square"
  //   );
  // }
}

// adds event listeners to the add ship buttons.
// When an add ship button is clicked it then runs AddEventOnGridClickAddShip()
// so you can click the grid to add a ship coords.
function addNewShipButtonClick() {
  let addShipButtonsNodeList = domElements.addShipButtons;
  console.log(addShipButtonsNodeList);
  Array.from(addShipButtonsNodeList).forEach((button) => {
    button.addEventListener("click", AddEventOnGridClickAddShip);
  });
}

// Runs when an add ship button is clicked from this function addNewShipButtonClick()
function AddEventOnGridClickAddShip(button) {
  console.log(this);
  gameController.assignShip = this.dataset.shiptype;
  gameController.assignToPlayer = this.dataset.playerName;
  let newShipArray = gameController.newShipArray;
  let gridSquares = undefined;

  if (gameController.assignToPlayer === "player1") {
    gridSquares = domElements.player1GridSquares;
  } else {
    gridSquares = domElements.player2GridSquares;
  }

  // Assign a variable that is gameController.assignShipToPlayer
  // When a grid square is clicked on add that square coordinates to an array
  Array.from(gridSquares).forEach((square) => {
    square.addEventListener("click", OnGridClickAddShip(square, newShipArray));
  });
}

function OnGridClickAddShip(gridSquare, newShipArray) {
  // Get the relevant info, player name from data attribute on DIV
  // Get grid coordinates.
  let squareCoordinates = gridSquare.dataset.coordinates;
  squareCoordinates = gameController.dataCoordsToArrayCoords(squareCoordinates);

  // On grid square click push coordinates to gameController newShipArray
  // When the elements in the newShipArray are the length of the ship you are adding
  // dont let anymore coordinates be added.
  // Also need to check if either 1st or 2nd index === 0 then it cant go -number.
  // To get the up or down direction, check if the element is at the end grid coord is
  // > or < than the other possible element.
  // Check if length of the array is the correct length that the ship you are placing
  // is
  // Push the array to the assignShipToPlayers ship coordinatesArray.
  // Change that ship buttons colour so so you know its been placed
}

function playerAttack(player) {
  const gridSquares = domElements.gridSquares;

  function addEventListenersToDOM() {
    // instead just have a button START GAME which turns on onGridClickAttack()
    if (gameController.attackOrAddShip === true) {
      addEventOnGridClickAttack();
    } else {
      onGridClickAddShip(player);
    }

    // use data-playername to run the mothods against the correct player object
  }
}
function addEventOnGridClickAttack() {
  // assign gridSquares to a variable
  const gridSquares = domElements.gridSquares;

  // loop through all the squares and add an event listener to them
  Array.from(gridSquares).forEach((square) => {
    square.addEventListener("click", OnGridClickAttack());
  });
}

function OnGridClickAttack() {
  // Get the relevant info, player name from data attribute on DIV
  // Get grid coordinates.
  let squareCoordinates = square.getAttribute("data-coordinates");
  let playerNameFromSquare = square.getAttribute("data-playername");
  // if to call receive attack against correct player
  // Call the hit method on the correct player object.
  if (playerNameFromSquare == "player1") {
    player1.board.receiveAttack(squareCoordinates);
  } else {
    player2.board.receiveAttack(squareCoordinates);
  }
}
// function to remove the eventListener which does an attck
// triggered when the user clicks to
function removeOnGridClickAttack() {
  Array.from(gridSquares).forEach((square) => {
    square.removeEventListener("click", OnGridClickAttack());
  });
}

export { createGameboardDOM, domElements, addNewShipButtonClick };

// adding a ship but a bit trickier
// Take start point coordinates , then next click take end point.
// Then fill in the coordinates of the array from the start point to end point.
// Check if 1st index or 2nd index is the same. That index can stay the same.
// loop through and make the array.
// Also need to check if either 1st or 2nd index === 0 then it cant go -number.
// To get the up or down direction, check if the element is at the end grid coord is
// > or < than the other possible element.
// Check if length of the array is the correct length that the ship you are placing
// is
// Push the array to the assignShipToPlayers ship coordinatesArray.
// Change that ship buttons colour so so you know its been placed

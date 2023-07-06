import { doc } from "prettier";
import { player1, player2 } from "./functions";
import { gameController } from "./classes";

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

  allGridSquares: document.getElementsByClassName("grid-square"),
};

// CREATES THE GAMEBOARD DIVS
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
}

// ADDS THE EVENT LISTENERS ON THE ADD SHIP BUTTONS
function addEventOnNewShipButton() {
  let addShipButtonsNodeList = domElements.addShipButtons;
  Array.from(addShipButtonsNodeList).forEach((button) => {
    button.addEventListener("click", assignShipToAdd);
  });
}

// FUNCTION THAT IS RUN WHEN ADD SHIP BUTTON ISCLICKED
function assignShipToAdd(event) {
  let target = event.target;
  gameController.assignShip = target.dataset.shiptype;
  gameController.assignToPlayer = target.dataset.playername;

  if (target.dataset.playername === "player1") {
    gameController.assignToPlayer = player1;
  } else {
    gameController.assignToPlayer = player2;
  }

  gameController.assignShipObject =
    gameController.assignToPlayer.board.getShipFromShipType();
}

// FUNCTION THAT ADDS THE EVENT LISTENER FOR ADDING SHIPS TO GRID SQUARES
function addEventOnGridClickAddShip() {
  let allGridSquaresNodeList = domElements.allGridSquares;
  Array.from(allGridSquaresNodeList).forEach((square) => {
    square.addEventListener("click", OnGridClickAddShip);
  });
}

// FUNCTION THAT IS RUN WHEN THE GRID SQUARE IS CLICKED TOO ADD SHIP
// IF gamecontroller.gameInPlay IS FALSE
function OnGridClickAddShip(event) {
  gameController.assignShipLength =
    gameController.assignToPlayer.board.getSpecificShipLength();

  // if the gameInPlay property is false do x
  if (!gameController.gameInPlay && !gameController.assignShipObject.placed) {
    let target = event.target;
    // Get the relevant info, player name from data attribute on DIV
    // Get grid coordinates.
    // Assign coords from grid square element to a varaible
    let squareCoordinates = target.dataset.coordinates;
    // Convert the string to an array.
    squareCoordinates =
      gameController.dataCoordsToArrayCoords(squareCoordinates);

    // Push the square coords to the newShipArray
    // gameController.newShipArray.push(squareCoordinates);
    // Push the coords to the correct player and ship array
    gameController.assignToPlayer.board.addCoordinatesToShipArray(
      squareCoordinates
    );
    target.classList.add("grid-square-ship");
    changeGridSquareDomColour(event.target);
  }
}

// FUNCTION THAT ADDS THE EVENT LISTENERS FOR ATTACKING TO THE GRID SQUARES
function addEventOnGridClickAttack() {
  let allGridSquaresNodeList = domElements.allGridSquares;
  Array.from(allGridSquaresNodeList).forEach((square) => {
    square.addEventListener("click", onGridClickAttack);
  });
}

// FUNCTION THAT IS RUN WHEN THE GRID SQUARE IS CLICKED TOO ATTACK SHIP
// IF gamecontroller.gameInPlay IS TRUE
function onGridClickAttack(event) {
  let target = event.target;

  if (gameController.gameInPlay) {
    let playerBoard = undefined;
    if (target.dataset.playername === "player1") {
      playerBoard = player1.board;
    } else {
      playerBoard = player2.board;
    }

    let attackCoordinates = target.dataset.coordinates;
    playerBoard.receiveAttack(attackCoordinates);
  }
}

// ADDS EVENT LISTENER TO THE START GAME BUTTON
// Sets the gameController.gameInPlay property to true;
function addEventStartGameButton() {
  domElements.startGameButton.addEventListener("click", (event) => {
    gameController.gameInPlay = true;
    console.log("Game has started!");
  });
}

// SETS THE SQUARE COLOUR DEPENDING ON SHIP TYPE
function changeGridSquareDomColour(eventTarget) {
  let shipType = gameController.assignShip;
  let newClass = "";

  switch (shipType) {
    case "carrier":
      newClass = "carrier";
      break;
    case "battleship":
      newClass = "battleship";
      break;
    case "destroyer":
      newClass = "destroyer";
      break;
    case "submarine":
      newClass = "submarine";
      break;
    case "patrol boat":
      newClass = "patrol-boat";
      break;
  }

  eventTarget.classList.add(newClass);
}

export {
  createGameboardDOM,
  domElements,
  addEventOnNewShipButton,
  addEventOnGridClickAddShip,
  addEventOnGridClickAttack,
  addEventStartGameButton,
};

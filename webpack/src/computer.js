import { player2 } from "./functions";
import { domElements } from "./DOM";
import { gameController } from "./classes";

// FUNCTION TOO ADD THE COMPUTER SHIPS

function addComputerShips() {
  // for each loop of player 2 ship objects to place each ship.
  let computerShipsArray = player2.board.shipArray;

  computerShipsArray.forEach((ship) => {
    // generate the grid coords for the ship
    // Pick a start coord, pick what direction hor and vert true/false,
    // make the other coords for the ship.
    // Check if any of the coords are out the grid or another ship already contains
    // them.
    let startCoord = generateRandomStartCoord();
    newCompShipArray = generateComputerShipCoords(startCoord, ship.length);
    // check to see if any of the computer ship coordinates exist already
    player2.board.checkIfShipsArrayCollide();

    // get corresponding DOM grid square and assign it the correct class.
    // push to ships coord array
  });
}

// generate a random start coordinate
function generateRandomStartCoord() {
  let coordArray = [];

  while (coordArray.length !== 2) {
    let num = Math.floor(Math.random() * 9);
    coordArray.push(num);
  }
  return startCoord;
}

// generate the ship array from a random start coordinate.
function generateComputerShipCoords(startCoord, shipLength) {
  // returns true or false to decide if its horizontal or vertical
  let horiOrVert = Math.random() >= 0.5;
  let coordinateArray = [];

  let x = startCoord[0];
  let y = startCoord[1];

  if (horiOrVert) {
    // pre check they are legal
    if (y + length > 9) {
      return generateComputerShipCoords(generateRandomStartCoord(), shipLength);
    }
    for (let i = 0; i < shipLength; i++) {
      coordinateArray.push([x, y + i]);
    }
  } else {
    // pre check they are legal
    if (x + shipLength > 9) {
      return generateComputerShipCoords(generateRandomStartCoord(), shipLength);
    }
    for (let i = 0; i < shipLength; i++) {
      coordinateArray.push([x + i, y]);
    }
  }

  return coordinateArray;
}

// function randomBoolean() {
//   let randomBool = Math.random() >= 0.5;
//   return randomBool;
// }

function getDomGridSquareFromCoords(coords) {
  let gridSquares = domElements.player2GridSquares;

  Array.from(gridSquares).forEach((square) => {
    let domGridSquareCoords = square.dataset.coordinates;
    domGridSquareCoords =
      gameController.dataCoordsToArrayCoords(domGridSquareCoords);

    if (domGridSquareCoords === coords) {
    }
  });
}

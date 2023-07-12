import { player2 } from "./functions";
import { domElements, changeGridSquareDomColour } from "./DOM";
import { gameController } from "./classes";

// FUNCTION TOO ADD THE COMPUTER SHIPS

function addComputerShips() {
  // for each loop of player 2 ship objects to place each ship.
  let computerShipsArray = player2.board.shipsArray;
  console.log(player2);
  computerShipsArray.forEach((ship) => {
    // Pick a start coord, pick what direction hor/vert true/false,
    // Fill the array with the correct coords for the ship.
    // Check if any of the coords are out the grid or another ship already contains
    // them.
    // let startCoord = generateRandomStartCoord();
    generateComputerShipCoords(
      generateRandomStartCoord(),
      ship.shipLength,
      ship.coordinateArray
    );

    // check to see if any of the computer ship coordinates exist already
    // If it returns true remake newCompShipArray
    if (player2.board.checkIfShipsArrayCollide(ship)) {
      generateComputerShipCoords(
        generateRandomStartCoord(),
        ship.length,
        ship.coordinateArray
      );
    }

    ship.coordinateArray.forEach((array) => {
      // find the dom grid square for each coords array
      let domGridSquare = getDomGridSquareFromCoords(array);

      // get corresponding DOM grid square and assign it the correct class.
      changeGridSquareDomColour(ship.shipType, domGridSquare);
    });

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
  return coordArray;
}

// generate the ship array from a random start coordinate.
function generateComputerShipCoords(
  startCoord,
  shipLength,
  shipCoordinateArray
) {
  // returns true or false to decide if its horizontal or vertical
  let horiOrVert = Math.random() >= 0.5;
  // let coordinateArray = [];

  let x = startCoord[0];
  let y = startCoord[1];

  if (horiOrVert) {
    // pre check they are legal
    if (y + length > 9) {
      return generateComputerShipCoords(generateRandomStartCoord(), shipLength);
    }
    for (let i = 0; i < shipLength; i++) {
      shipCoordinateArray.push([x, y + i]);
    }
  } else {
    // pre check they are legal
    if (x + shipLength > 9) {
      return generateComputerShipCoords(generateRandomStartCoord(), shipLength);
    }
    for (let i = 0; i < shipLength; i++) {
      shipCoordinateArray.push([x + i, y]);
    }
  }

  // return coordinateArray;
}

// function randomBoolean() {
//   let randomBool = Math.random() >= 0.5;
//   return randomBool;
// }

function getDomGridSquareFromCoords(coords) {
  // assign grid square node array to variable
  let gridSquares = domElements.player2GridSquares;

  let gridSquare = Array.from(gridSquares).find((square) => {
    let domGridSquareCoords = square.dataset.coordinates;
    domGridSquareCoords =
      gameController.dataCoordsToArrayCoords(domGridSquareCoords);

    if (domGridSquareCoords === coords) {
      return square;
    }
  });

  return gridSquare;

  // Array.from(gridSquares).forEach((square) => {
  //   let domGridSquareCoords = square.dataset.coordinates;
  //   domGridSquareCoords =
  //     gameController.dataCoordsToArrayCoords(domGridSquareCoords);

  //   if (domGridSquareCoords === coords) {
  //   }
  // });
}

export { addComputerShips };

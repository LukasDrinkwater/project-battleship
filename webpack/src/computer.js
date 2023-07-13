import { player1, player2 } from "./functions";
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
    generateComputerShipCoords(generateRandomStartCoord(), ship);

    // check to see if any of the computer ship coordinates exist already
    // If it returns true remake newCompShipArray
    // if (player2.board.checkIfShipsArrayCollide(ship)) {
    //   console.log("redmaking ship", ship);
    //   ship.coordinateArray = [];
    //   generateComputerShipCoords(
    //     generateRandomStartCoord(),
    //     ship.shipLength,
    //     ship.coordinateArray
    //   );
    // }

    ship.coordinateArray.forEach((array) => {
      // find the dom grid square for each coords array
      let domGridSquare = getDomGridSquareFromCoords(array);

      // get corresponding DOM grid square and assign it the correct class.
      changeGridSquareDomColour(domGridSquare, ship.shipType);
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
function generateComputerShipCoords(startCoord, ship) {
  // returns true or false to decide if its horizontal or vertical
  let horiOrVert = Math.random() >= 0.5;
  let shipLength = ship.shipLength;
  let shipCoordinateArray = ship.coordinateArray;

  if (shipCoordinateArray.length !== 0) shipCoordinateArray = [];

  let x = startCoord[0];
  let y = startCoord[1];

  if (horiOrVert) {
    // pre check they are legal
    if (y + shipLength > 9) {
      shipCoordinateArray = [];
      return generateComputerShipCoords(generateRandomStartCoord(), ship);
    }
    for (let i = 0; i < shipLength; i++) {
      shipCoordinateArray.push([x, y + i]);
    }
  } else {
    // pre check they are legal
    if (x + shipLength > 9) {
      shipCoordinateArray = [];
      return generateComputerShipCoords(generateRandomStartCoord(), ship);
    }
    for (let i = 0; i < shipLength; i++) {
      shipCoordinateArray.push([x + i, y]);
    }
  }

  if (player2.board.checkIfShipsArrayCollide(ship)) {
    ship.coordinateArray = [];
    return generateComputerShipCoords(generateRandomStartCoord(), ship);
  }
}

// function to make the computer attack the player
function computerAttack() {
  if (gameController.computer && gameController.playerTurn === false) {
    let playerBoard = player1.board;
    let computerAttackCoords = generateRandomStartCoord();
    // send the computer attack coords to player1 board object.
    let attack = playerBoard.receiveAttack(computerAttackCoords);

    let target = getDomGridSquareFromCoords(computerAttackCoords);

    if (attack) {
      target.classList.add("hit");
    } else if (attack === false) {
      target.classList.add("miss");
    }
  }
  gameController.playerTurn = !gameController.playerTurn;
}

function getDomGridSquareFromCoords(coords) {
  let gridSquares = domElements.player2GridSquares;
  // assign grid square node array to variable
  if (gameController.playerTurn === false) {
    gridSquares = domElements.player1GridSquares;
  }

  let gridSquare = Array.from(gridSquares).find((square) => {
    let domGridSquareCoords = square.dataset.coordinates;
    domGridSquareCoords =
      gameController.dataCoordsToArrayCoords(domGridSquareCoords);

    if (
      domGridSquareCoords[0] === coords[0] &&
      domGridSquareCoords[1] === coords[1]
    ) {
      return true;
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

export { addComputerShips, computerAttack };

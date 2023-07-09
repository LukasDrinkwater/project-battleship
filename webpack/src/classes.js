// TOP says create ship objects
// Properties - hit count/hp, lenpropertygth, if they are sunk
// Method hit() that ++ the hit count
// Method isSunk() that calculates it based off the length and number of hits.

// import { gameController } from "./functions";

class Ship {
  constructor(shipType, shipLength) {
    this._shipType = shipType;
    // this.player = player;
    this.coordinateArray = [];
    this.hitCount = 0;
    this.shipLength = shipLength;
    this.placed = false;
    this._playerNameString = "";
    this.sunkOrNot = false;
  }
  set shipType(type) {
    this._shipType = type;
  }
  set playerNameString(playerNameString) {
    this._playerNameString = playerNameString;
  }
  get shipType() {
    return this._shipType;
  }
  get playerNameString() {
    if (gameController.playerTurn === true) {
      return "Player 2";
    } else {
      return "Player 1";
    }
  }
  hit() {
    this.hitCount++;
    console.log(`${this.playerNameString} ${this.shipType} has been hit.`);
  }
  checkIfSunk() {
    if (this.shipLength === this.hitCount) {
      console.log(`${this.playerNameString} ${this.shipType} has been sunk!`);
      this.sunkOrNot = true;
      return true;
    } else {
      return false;
    }
  }
}

// Class function that makes the gameboard
// Need to then make 2 boards, 1 for each player
// Properties - player, status for each type of ship, ship hp,
// Method that gets called when a ship is hit and takes 1 hp off the ship type
// Method instead of the above maybe, receiveAttack() function that takes a pair of
// coordinates and if it hits a ship, also records the coordinates of a missed ship

class Gameboard {
  constructor(playerName) {
    this.playerName = playerName;
    this.boardArray = [];
    this.missedAttacks = [];
    this.shipsArray = []; // to check if all the ships have been sunk
    // Might not need it though
  }
  createGameboard() {
    let boardArray = this.boardArray;

    // for in for that makes the gameboard array.
    for (let i = 0; i < 10; i++) {
      boardArray[i] = [];
      for (let j = 0; j < 10; j++) {
        boardArray[i][j] = [i, j];
      }
    }
    // return boardArray;
  }
  receiveAttack(attackCoordinates) {
    if (this.playerName === "player2" && gameController.playerTurn === false) {
      alert("It is player 2's turn to attack player 1!");
      return;
    }
    if (this.playerName === "player1" && gameController.playerTurn === true) {
      alert("It is player 1's turn to attack player 2");
      return;
    }
    let shipFound = undefined;
    let shipsArray = this.shipsArray;
    // turn the string value from the data attribute into an array
    let targetCoordinates =
      gameController.dataCoordsToArrayCoords(attackCoordinates);

    let foundCoordinate = undefined;
    // loop through the ships in the players gameboard.shipsArray
    for (let ship of shipsArray) {
      // if coordinates === to coordinates in a ship ojbect
      // ship has been hit
      shipFound = ship.coordinateArray.find(
        (coordinates) =>
          // Check if coordinates match the targetCoordinates
          coordinates[0] === targetCoordinates[0] &&
          coordinates[1] === targetCoordinates[1]
      );

      if (shipFound != undefined) {
        ship.hit();
        ship.checkIfSunk();
        foundCoordinate = targetCoordinates;
        if (!gameController.computer) {
          gameController.playerTurn = !gameController.playerTurn;
        }
        this.checkIfAllShipsSunk();
        return true;
      }
      if (foundCoordinate != undefined)
        // if the coordinates have a ship assigned to them break out for of lopp
        break;
    }
    // Else its a miss, push coordinates to missed attacks array
    if (foundCoordinate === undefined) {
      this.missedAttacks.push(targetCoordinates);
      if (!gameController.computer) {
        gameController.playerTurn = !gameController.playerTurn;
      }
      return false;
    }
    // gameController.playerTurn = !gameController.playerTurn;
    // this.checkIfAllShipsSunk();
  }
  addCoordinatesToShipArray(inputCoordinateArray) {
    let shipsArray = this.shipsArray;
    gameController.newShipArray.push(inputCoordinateArray);

    let shipArrayToAddTo = shipsArray.find(
      (element) => element.shipType === gameController.assignShip
    );

    shipArrayToAddTo.coordinateArray.push(inputCoordinateArray);
    // each time a ship is placed at a sqaure it checks if it is the correct length
    // and if it is console logs a message and exits the function. To prevent the user
    // placing too many ship squares per ship.
    if (
      // gameController.newShipArray.length === gameController.assignShipLength
      shipArrayToAddTo.coordinateArray.length ===
      gameController.assignShipLength
    ) {
      // run function that checks if the position is legal. horizontal or vertical
      // not diagonal
      if (this.checkIfArrayLegal(shipArrayToAddTo.coordinateArray) === false) {
        // reset shipArray of the ship we are adding to
        shipArrayToAddTo.coordinateArray = [];
        gameController.newShipArray = [];
        console.log("break in false check");
        return false;
      }

      console.log(`${gameController.assignShipObject.shipType} placed`);
      gameController.assignShipObject.placed = true;
      // Reset the gameController for the next ship.
      gameController.newShipArray = [];
      console.log("break out normally");
      // break out of the function.
      return true;
    }
  }
  getShipFromShipType() {
    let shipsArray = this.shipsArray;

    let ship = shipsArray.find(
      (element) => element.shipType === gameController.assignShip
    );

    return ship;
  }
  getSpecificShipLength() {
    let ship = this.shipsArray.find(
      (element) => element.shipType === gameController.assignShip
    );
    return ship.shipLength;
  }
  checkIfAllShipsSunk() {
    let shipsArray = this.shipsArray;

    let areAllSunk = shipsArray.find((ship) => ship.sunkOrNot === false);

    if (areAllSunk === undefined) {
      console.log(`Game over. All ${this.playerName} ships have been sunk!`);
      alert(`Game over. All ${this.playerName} ships have been sunk!`);
    }
  }
  checkIfArrayLegal(coordinates) {
    // if the first condition = 0 it does the other condition on the array.

    let sortedArray = coordinates
      .slice()
      .sort((a, b) => a[0] - b[0] || a[1] - b[1]);

    let horizontalCheck;
    let verticalCheck;
    let horizontalIncrementCheck;
    let verticalIncrementCheck;
    // check to see if the ship is horizontal
    if (sortedArray[0][0] === sortedArray[sortedArray.length - 1][0]) {
      horizontalCheck = true;
    } else {
      horizontalCheck = false;
    }
    // check to see it the ship is vertical
    if (sortedArray[0][1] === sortedArray[sortedArray.length - 1][1]) {
      verticalCheck = true;
    } else {
      verticalCheck = false;
    }

    // check to see if the ship has any spaces.
    for (let i = 1; i < sortedArray.length; i++) {
      const prevCoords = sortedArray[i - 1];
      const currCoords = sortedArray[i];

      // Check x-coordinate
      if (currCoords[0] !== prevCoords[0] + 1) {
        horizontalIncrementCheck = false;
        break;
      }

      // Check y-coordinate
      if (currCoords[1] !== prevCoords[1] + 1) {
        verticalIncrementCheck = false;
        break;
      }
    }

    if (
      (verticalIncrementCheck !== false ||
        horizontalIncrementCheck !== false) &&
      (horizontalCheck === true || verticalCheck === true)
    ) {
      return true;
    } else {
      alert(
        "Shit placement is invalid. The ship must be horizonal or vertial and have no gaps."
      );
      return false;
    }
  }
  checkIfShipsArrayCollide(newCoordinate) {
    let shipsArray = this.shipsArray;

    shipsArray.forEach((ship) => {
      ship.coordinateArray.find((coordinate) => {
        if (
          coordinate[0] === newCoordinate[0] &&
          coordinate[1] === newCoordinate[1]
        ) {
          return true;
        } else {
          return false;
        }
      });
    });
  }
}

// Might not have to use the node/square class if i do all the above methods in
// the gameboard class. Dont need to create a node/square for each coordinate. Just
// need to see if the coordinates match some cordinates attached to a ship object.
// Class for the node/squares
// Preporties - ship type, if square is hit, row, col
// Method that changes a squares hit status then calls the Method from the
// correct players gameboard to take 1 hp off the ship type

// create Player class?
// 1 or 2? or just have a property that says whos turn it is

class Player {
  constructor(board, playerName, playerTurn) {
    this.board = board;
    this.playerName = playerName;
    this.playerTurn = playerTurn;
  }
}

// computer, get it to pick a random square??????????

// MAIN GAME LOOP
// needs a user interface showing both players boards, ships on the boards
// To attack, user needs to click on a coordinate in the enemy gameboard
// can use data type to have the correct coordinates.
// TOP says to only use methods in the objects for the game loop

class GameController {
  constructor() {
    this.playerTurn = true;
    // assignShipToPlayer gets set to the player data attribute when they click their
    // add ship button.
    this.assignShip;
    this.assignShipObject;
    this.assignShipLength = undefined;
    this.assignToPlayer;
    // this.attackOrAddShip = true;
    this.newShipArray = [];
    this.gameInPlay = false;
    this.computer = false;
  }
  dataCoordsToArrayCoords(string) {
    return string.split(",").map((coord) => parseInt(coord));
  }
}

const gameController = new GameController();

function capitalise(word) {
  return word.charAt(0).toUpperCase() + word.slice(1);
}

export { Ship, Gameboard, Player, GameController, capitalise, gameController };

export default capitalise;

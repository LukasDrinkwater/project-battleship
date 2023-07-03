// TOP says create ship objects
// Properties - hit count/hp, lenpropertygth, if they are sunk
// Method hit() that ++ the hit count
// Method isSunk() that calculates it based off the length and number of hits.

import { gameController } from "./functions";

class Ship {
  constructor(shipType, shipLength) {
    this._shipType = shipType;
    // this.player = player;
    this.coordinateArray = [];
    this.hitCount = 0;
    this.shipLength = shipLength;
    this.placed = false;
  }
  set shipType(type) {
    this._shipType = type;
  }
  get shipType() {
    return this._shipType;
  }
  hit() {
    this.hitCount++;
    console.log(`${this.player} ${this.shipType} has been hit.`);
  }
  checkIfSunk() {
    if (this.shipLength === this.hitCount) {
      console.log(`${this.player} ${this.shipType} has been sunk!`);
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
  constructor() {
    // this.player = player;
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
    if (!this.playerName === "player1" && gameController.playerTurn === false) {
      alert("It is player 2's turn");
    }
    if (!this.playerName === "player2" && gameController.playerTurn === true) {
      alert("It is player 2's turn");
    }
    let shipFound = undefined;
    let shipsArray = this.shipsArray;
    // turn the string value from the data attribute into an array
    const targetCoordinates =
      gameController.dataCoordsToArrayCoords(attackCoordinates);

    let foundCoordinate = undefined;
    // loop through the ships in the players gameboard.shipsArray
    for (let ship of shipsArray) {
      // if coordinates === to coordinates in a ship ojbect
      // ship has been hit

      shipFound = ship.coordinateArray.find(
        (coordinates) =>
          // Check if coordinates match the targetCoordinates
          // if (
          coordinates[0] === targetCoordinates[0] &&
          coordinates[1] === targetCoordinates[1]
        // coordinates === targetCoordinates;
        // ) {
        //   ship.hit();
        //   ship.checkIfSunk();
        //   foundCoordinate = coordinates;
        //   return true;
        // }
      );

      if (shipFound != undefined) {
        ship.hit();
        ship.checkIfSunk();
        foundCoordinate = coordinates;
        return true;
      }
      if (foundCoordinate != undefined)
        // if the coordinates have a ship assigned to them break out for of lopp
        break;
    }
    // Else its a miss, push coordinates to missed attacks array
    if (foundCoordinate != undefined) {
      this.missedAttacks.push(targetCoordinates);
    }
  }
  addCoordinatesToShipArray(inputCoordinateArray) {
    let shipsArray = this.shipsArray;

    let shipArrayToAddTo = shipsArray.find(
      (element) => element.shipType === gameController.assignShip
    );

    shipArrayToAddTo.coordinateArray.push(inputCoordinateArray);
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

function capitalise(word) {
  return word.charAt(0).toUpperCase() + word.slice(1);
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
  }
  dataCoordsToArrayCoords(string) {
    return string.split(",").map((coord) => parseInt(coord));
  }
}

export { capitalise };

export { Ship, Gameboard, Player, GameController };

// could do createShipArray like this but it complicated.
// function createArrayOfArrays(start, end) {
//   const result = [];

//   for (let i = start[0]; i <= end[0]; i++) {
//     const subArray = [i, start[1] + (i - start[0])];
//     result.push(subArray);
//   }

//   return result;
// }

// const start = [0, 1];
// const end = [0, 4];
// const arrayResult = createArrayOfArrays(start, end);

// console.log(arrayResult);

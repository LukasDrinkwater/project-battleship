// TOP says create ship objects
// Properties - hit count/hp, lenpropertygth, if they are sunk
// Method hit() that ++ the hit count
// Method isSunk() that calculates it based off the length and number of hits.

import { gameController } from "./functions";

class Ship {
  constructor(shipType, shipLength) {
    this.shipType = shipType;
    // this.player = player;
    this.coordinateArray = [];
    this.hitCount = 0;
    this.shipLength = this.shipLength;
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
    let shipsArray = this.shipsArray;
    // turn the string value from the data attribute into an array
    const targetCoordinates = this.dataCoordsToArrayCoords(attackCoordinates);
    // const targetCoordinates = attackCoordinates
    //   .split(",")
    //   .map((coord) => parseInt(coord));

    let foundCoordinate = undefined;
    // loop through the ships in the players gameboard.shipsArray
    for (let ship of shipsArray) {
      // if coordinates === to coordinates in a ship ojbect
      // ship has been hit

      ship.coordinateArray.forEach((array) =>
        array.find((coordinates) => {
          // Check if coordinates match the targetCoordinates
          if (
            coordinates[0] === targetCoordinates[0] &&
            coordinates[1] === targetCoordinates[1]
          ) {
            ship.hit();
            ship.checkIfSunk();
            foundCoordinate = coordinates;
            return true;
          }
        })
      );
      // if the coordinates have a ship assigned to them break out for of lopp
      if (foundCoordinate != undefined) break;
    }
    // Else its a miss, push coordinates to missed attacks array
    if (foundCoordinate != undefined) {
      this.missedAttacks.push(targetCoordinates);
    }
  }
  addCoordinatesToShipArray(inputShipType, inputCoordinateArray) {
    let shipsArray = this.shipsArray;

    let shipToAddTo = shipsArray.find(
      (element) => element.shipType === inputShipType
    );

    shipToAddTo.coordinateArray.push(inputCoordinateArray);
  }
  dataCoordsToArrayCoords(string) {
    return string.split(",").map((coord) => parseInt(coord));
  }
  createShipArray(start, end) {
    let ship = this.shipsArray.find(
      (element) => element === gameController.assignShip
    );
    const lengthOfShip = ship.length;
    Array.from({ lengthOfShip }, (_, i) => i + 1);
    //=> [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
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
    this.playerTurn;
    // assignShipToPlayer gets set to the player data attribute when they click their
    // add ship button.
    this.assignShip;
    this.attackOrAddShip = true;
    this.shipStart;
    this.shipEnd;
  }
}

export { capitalise };

export { Ship, Gameboard, Player, GameController };

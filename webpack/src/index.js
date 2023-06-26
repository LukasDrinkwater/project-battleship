import _ from "lodash";
import "./styles.css";

// TOP says create ship objects
// Properties - hit count/hp, lenpropertygth, if they are sunk
// Method hit() that ++ the hit count
// Method isSunk() that calculates it based off the length and number of hits.

class Ship {
  constructor(shipType) {
    this.shipType = shipType;
    this.player = player;
    this.coordinateArray = [];
    this.hitCount = 0;
    this.shipLength = coordinateArray.length;
  }
  hit() {
    this.hitCount++;
    console.log(`${this.player} ${this.shipType} has been hit.`);
  }
  checkIfSunk() {
    if (this.shipLength === this.hitCount) {
      console.log(`${this.player} ${this.shipType} has been sunk!`);
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

    for (let ship of shipsArray) {
      if (ship.coordinateArray.find(attackCoordinates)) {
        ship.hit();
        ship.checkIfSunk();
      } else {
        this.missedAttacks.push(attackCoordinates);
      }
    }
    // if coordinates === to coordinates in a ship ojbect
    // ship has been hit
    // Else its a miss, push coordinates to missed attacks array
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
  constructor(board) {
    this.board = board;
  }
}

// computer, get it to pick a random square??????????

// MAIN GAME LOOP
// needs a user interface showing both players boards, ships on the boards
// To attack, user needs to click on a coordinate in the enemy gameboard
// can use data type to have the correct coordinates.
// TOP says to only use methods in the objects for the game loop

module.exports = {};

export { Ship, Gameboard, Player };

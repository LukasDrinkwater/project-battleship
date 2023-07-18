// TOP says create ship objects
// Properties - hit count/hp, lenpropertygth, if they are sunk
// Method hit() that ++ the hit count
// Method isSunk() that calculates it based off the length and number of hits.

// import { gameController } from "./functions";
import { domElements, createGameboardDOM } from "./DOM";
import { player1, player2 } from "./functions";
import {
  player1BoardState,
  player2BoardState,
  initialiseEventListeners,
} from "./controller";

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
    } else if (gameController.playerTurn === true && gameController.computer) {
      return "Computer";
    } else {
      return "Player 1";
    }
  }
  hit() {
    this.hitCount++;
    console.log(`${this.playerNameString} ${this.shipType} has been hit.`);
    return `${this.playerNameString} ${this.shipType} has been hit.`;
  }
  checkIfSunk() {
    if (this.shipLength === this.hitCount) {
      console.log(`${this.playerNameString} ${this.shipType} has been sunk!`);
      this.sunkOrNot = true;
      return `${this.playerNameString} ${this.shipType} has been sunk!`;
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
    this.alreadyAttacked = [];
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
  receiveAttack(targetCoordinates) {
    if (this.playerName === "player2" && gameController.playerTurn === false) {
      alert("It is player 2's turn to attack player 1!");
      return;
    } else if (
      this.playerName === "player1" &&
      gameController.playerTurn === true
    ) {
      alert("It is player 1's turn to attack player 2");
      return;
    }
    let shipFound = undefined;
    let shipsArray = this.shipsArray;
    // turn the string value from the data attribute into an array
    if (typeof targetCoordinates === "string") {
      targetCoordinates =
        gameController.dataCoordsToArrayCoords(targetCoordinates);
    }

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
        this.updateNotificationBox(ship.hit());
        this.updateNotificationBox(ship.checkIfSunk());

        foundCoordinate = targetCoordinates;
        this.alreadyAttacked.push(targetCoordinates);
        // if PvComputer is false it changes to the other players turn.
        // if (!gameController.computer) {
        gameController.playerTurn = !gameController.playerTurn;
        // }
        this.checkIfAllShipsSunk();
        return true;
      }
      if (gameController.playerTurn) {
        this.updateStatusBox("Player 1");
      } else if (!gameController.playerTurn && gameController.computer) {
        this.updateStatusBox("Computer");
      } else {
        this.updateStatusBox("Player 2");
      }
    }
    // Else its a miss, push coordinates to missed attacks array
    if (foundCoordinate === undefined) {
      this.missedAttacks.push(targetCoordinates);
      // if (!gameController.computer) {
      gameController.playerTurn = !gameController.playerTurn;
      // }
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
        return false;
      }

      console.log(`${gameController.assignShipObject.shipType} placed`);
      gameController.assignShipObject.placed = true;
      // Reset the gameController for the next ship.
      gameController.newShipArray = [];
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

    let areAllSunk = shipsArray.find(
      (ship) => ship.sunkOrNot === false && ship.placed === true
    );

    if (areAllSunk === undefined) {
      if (gameController.playerTurn) {
        this.updateNotificationBox("Player 2 has won");
      } else if (!gameController.playerTurn && gameController.computer) {
        this.updateNotificationBox("Computer has won");
      } else {
        this.updateNotificationBox("Player 1 has won");
      }

      console.log(`Game over. All ${this.playerName} ships have been sunk!`);
      gameController.gameOver();
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
  checkIfShipsArrayCollide(newShip) {
    let shipsArray = this.shipsArray;
    let newShipArray = newShip.coordinateArray;
    let allCoordsArray = [];

    // forEach loop through all the computers ship Objects.

    //
    //

    for (const ship of shipsArray) {
      if (
        ship.shipType !== newShip.shipType &&
        ship.coordinateArray.length !== 0
      ) {
        for (let coord of ship.coordinateArray) {
          allCoordsArray.push(coord);
        }
      }

      for (const array of newShipArray) {
        const collision = allCoordsArray.find((coord) => {
          // if it finds a match it returns it to collision
          return array[0] === coord[0] && array[1] === coord[1];
        });

        if (collision) {
          return true;
        }
      }
    }

    return false;
  }
  updateStatusBox(message) {
    let statusBox = domElements.statusBox;

    if (gameController.playerTurn) {
      statusBox.innerHTML = "Computers turn";
    } else if (!gameController.playerTurn && gameController.computer) {
      statusBox.innerHTML = "Player 1 turn";
    } else {
      statusBox.innerHTML = "Player 2 turn";
    }
  }
  updateNotificationBox(message) {
    if (!message) return;
    let notificationBox = domElements.notificationBox;
    notificationBox.innerHTML = message;
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
    this.assignShip = undefined;
    this.assignShipObject = undefined;
    this.assignShipLength = undefined;
    this.assignToPlayer = undefined;
    // this.attackOrAddShip = true;
    this.newShipArray = [];
    this.gameInPlay = false;
    this.computer = false;
  }
  dataCoordsToArrayCoords(string) {
    return string.split(",").map((coord) => parseInt(coord));
  }
  gameOver() {
    const button = document.getElementById("reset-button");
    const resetContainer = document.getElementById("reset-container");
    resetContainer.classList.add("active");
    const overlay = document.getElementById("overlay");
    overlay.classList.add("active");

    button.addEventListener("click", () => gameController.resetGame());
  }
  resetGame() {
    const resetContainer = document.getElementById("reset-container");
    resetContainer.classList.remove("active");
    const overlay = document.getElementById("overlay");
    overlay.classList.remove("active");

    console.log("working");
    gameController.playerTurn = true;
    gameController.assignShip = undefined;
    gameController.assignShipLength = undefined;
    gameController.assignToPlayer = undefined;
    gameController.newShipArray = [];
    gameController.gameInPlay = false;
    gameController.computer = false;

    domElements.player1GameboardDOM.innerHTML = player1BoardState;
    // createGameboardDOM(player1);

    player1.board.shipsArray.forEach((ship) => {
      ship.coordinateArray = [];
      ship.hitCount = 0;
      ship.placed = false;
      ship.sunkOrNot = false;
    });

    domElements.player2GameboardDOM.innerHTML = player2BoardState;
    // createGameboardDOM(player2);

    player2.board.shipsArray.forEach((ship) => {
      ship.coordinateArray = [];
      ship.hitCount = 0;
      ship.placed = false;
      ship.sunkOrNot = false;
    });

    initialiseEventListeners();
  }
}

const gameController = new GameController();

function capitalise(word) {
  return word.charAt(0).toUpperCase() + word.slice(1);
}

export { Ship, Gameboard, Player, GameController, capitalise, gameController };

export default capitalise;
